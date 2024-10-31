interface ConfigJSON {
    output: {
        filePath: string,
        style: "xml" | "plain" | "markdown",
        instructionFilePath: string,
        removeComments: boolean,
        removeEmptyLines: boolean,
        topFilesLength: number,
        showLineNumbers: boolean
    },
    include: string[],
    ignore: {
        useGitignore: boolean,
        useDefaultPatterns: boolean,
        customPatterns: string[]
    },
    security: {
        enableSecurityCheck: boolean
    }
}


const defaultConfig: ConfigJSON = {
    output: {
        filePath: "RepoAnalysis.txt",
        style: "plain",
        instructionFilePath: '{CURRENT_DIRECTORY}/routes/instruction.md',
        removeComments: false,
        removeEmptyLines: true,
        topFilesLength: 5,
        showLineNumbers: false,
    },
    include: [],
    ignore: {
        useGitignore: true,
        useDefaultPatterns: true,
        customPatterns: ['**/README.md'],
    },
    security: {
        enableSecurityCheck: true,
    }
};

export {defaultConfig, type ConfigJSON};
