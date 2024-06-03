import type { Config } from "jest"

const config: Config = {
  projects: ["<rootDir>/apps/**/jest.config.ts"],
  moduleFileExtensions: ["js", "ts", "tsx"],
}

export default config
