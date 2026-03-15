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
      in
      {
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
