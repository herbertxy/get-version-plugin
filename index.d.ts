
declare module 'get-version-plugin' {
    import { Compiler } from 'webpack';
  
    interface GetVersionPluginOptions {
      path?: string; // output path
      offset?: number; // timezone offset
    }
  
    class GetVersionPlugin {
      constructor(options: GetVersionPluginOptions);
  
      apply(compiler: Compiler): void;
    }
  
    export = GetVersionPlugin;
  }