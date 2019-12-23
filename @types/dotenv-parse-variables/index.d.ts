declare module 'dotenv-parse-variables' {
  function parse(env: Record<string, string>): Record<string, any>;

  export = parse;
}
