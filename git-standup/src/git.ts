import { execa } from "execa";

export const getCommits = async (
  repoPath: string,
  since: string,
): Promise<string[]> => {
  const result = await execa(
    "git",
    ["log", `--since=${since}`, "--format=%s"],
    { cwd: repoPath },
  );
  return result.stdout.split("\n").filter((line) => line !== "");
};
