{
  description = "CLI test tools dev environment";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        # buildスクリプト + bin エントリがある奴だけパッケージ化
        mkTool =
          {
            pname,
            version,
            src,
            npmDepsHash,
            binName,
            buildCmd ? "npx tsc",
          }:
          pkgs.buildNpmPackage {
            inherit
              pname
              version
              src
              npmDepsHash
              ;
            nodejs = pkgs.nodejs_22;

            buildPhase = ''
              runHook preBuild
              ${buildCmd}
              runHook postBuild
            '';

            installPhase = ''
              runHook preInstall
              mkdir -p $out/lib/${pname}
              cp -r dist $out/lib/${pname}/dist
              cp package.json $out/lib/${pname}/
              npm prune --omit=dev 2>/dev/null || true
              [ -d node_modules ] && cp -r node_modules $out/lib/${pname}/

              mkdir -p $out/bin
              cat > $out/bin/${binName} <<WRAPPER
              #!/bin/sh
              exec node $out/lib/${pname}/dist/index.js "\$@"
              WRAPPER
              chmod +x $out/bin/${binName}
              runHook postInstall
            '';
          };

      in
      {
        packages = {
          git-taiwa = mkTool {
            pname = "git-taiwa";
            version = "1.0.0";
            src = ./git-taiwa;
            binName = "git-taiwa";
            buildCmd = "npx tsup src/index.ts --format esm";
            # nix build .#git-taiwa 後に出るhashをここに貼る
            npmDepsHash = "sha256-ge/GdDDC4/ntNai5FeR19NfXuWoxkzqf/1VvHP24wpE=";
          };

          note = mkTool {
            pname = "note";
            version = "0.1.0";
            src = ./simple-note-cli;
            binName = "note";
            npmDepsHash = "sha256-xXZDwfieS/NIsdpVbAC0rqz+8XQiYcQwhgGT1v8uX7Q=";
          };

          todo = mkTool {
            pname = "todo";
            version = "0.1.0";
            src = ./simple-todo-cli;
            binName = "todo";
            npmDepsHash = "sha256-Uwt5lni9eVEQY83WRyOD96bgWrq2VL3T3mDONCC0Cso=";
          };

          wc = mkTool {
            pname = "wc-cli";
            version = "0.1.0";
            src = ./wc;
            binName = "wc-cli";
            npmDepsHash = "sha256-E8oMvueyhVqLfM2uIU7B68tWmRvkZ/xL1r7TXET9mLc=";
          };

          text-util = mkTool {
            pname = "text-util";
            version = "0.1.0";
            src = ./text-util;
            binName = "text-util";
            npmDepsHash = "sha256-lnXd29P+LWRHxmP/hIXULiYXNZ0P5V/fY6xH7nKVZJw=";
          };

          default = self.packages.${system}.git-taiwa;
        };

        devShells.default = pkgs.mkShell {
          name = "cli-test-tool";
          packages = with pkgs; [
            nodejs_22
            nodePackages.typescript
            nodePackages.pnpm
            claude-code
            opencode
          ];
          shellHook = ''
            echo "CLI Test Tool dev shell"
            echo "Node: $(node --version)"
            echo "npm:  $(npm --version)"
            echo "pnpm: $(pnpm --version)"
            echo "install: claude-code, opencode"
          '';
        };
      }
    );
}
