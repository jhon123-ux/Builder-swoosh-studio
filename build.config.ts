import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

export interface BuildOptions {
  mode: "development" | "production" | "staging";
  analyze?: boolean;
  sourcemap?: boolean;
  minify?: boolean;
  target?: string;
  outDir?: string;
  assetsDir?: string;
  publicDir?: string;
}

export class BuildConfig {
  private options: BuildOptions;

  constructor(options: Partial<BuildOptions> = {}) {
    this.options = {
      mode: "production",
      analyze: false,
      sourcemap: true,
      minify: true,
      target: "es2015",
      outDir: "dist",
      assetsDir: "assets",
      publicDir: "public",
      ...options,
    };
  }

  /**
   * Get the complete Vite configuration for building
   */
  getViteConfig(): UserConfig {
    return defineConfig({
      plugins: [react()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
      build: {
        outDir: this.options.outDir,
        assetsDir: this.options.assetsDir,
        sourcemap: this.options.sourcemap,
        minify: this.options.minify ? "esbuild" : false,
        target: this.options.target,
        rollupOptions: {
          output: {
            manualChunks: {
              // Split vendor chunks for better caching
              react: ["react", "react-dom"],
              router: ["react-router-dom"],
              ui: [
                "@radix-ui/react-accordion",
                "@radix-ui/react-dialog",
                "@radix-ui/react-dropdown-menu",
              ],
              utils: ["clsx", "tailwind-merge", "class-variance-authority"],
              animations: ["framer-motion"],
              icons: ["lucide-react"],
            },
            chunkFileNames: (chunkInfo) => {
              const facadeModuleId = chunkInfo.facadeModuleId
                ? chunkInfo.facadeModuleId
                    .split("/")
                    .pop()
                    ?.replace(/\.\w+$/, "") || "chunk"
                : "chunk";
              return `${this.options.assetsDir}/[name]-[hash].js`;
            },
            assetFileNames: `${this.options.assetsDir}/[name]-[hash].[ext]`,
          },
        },
        chunkSizeWarningLimit: 1000,
        reportCompressedSize: this.options.analyze,
      },
      define: {
        __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
        __BUILD_MODE__: JSON.stringify(this.options.mode),
      },
      publicDir: this.options.publicDir,
    });
  }

  /**
   * Get build statistics and information
   */
  getBuildInfo() {
    return {
      mode: this.options.mode,
      outDir: this.options.outDir,
      sourcemap: this.options.sourcemap,
      minify: this.options.minify,
      target: this.options.target,
      buildTime: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform,
    };
  }

  /**
   * Create optimized production build configuration
   */
  static production(overrides: Partial<BuildOptions> = {}): BuildConfig {
    return new BuildConfig({
      mode: "production",
      sourcemap: false,
      minify: true,
      analyze: false,
      ...overrides,
    });
  }

  /**
   * Create development build configuration
   */
  static development(overrides: Partial<BuildOptions> = {}): BuildConfig {
    return new BuildConfig({
      mode: "development",
      sourcemap: true,
      minify: false,
      analyze: false,
      ...overrides,
    });
  }

  /**
   * Create staging build configuration
   */
  static staging(overrides: Partial<BuildOptions> = {}): BuildConfig {
    return new BuildConfig({
      mode: "staging",
      sourcemap: true,
      minify: true,
      analyze: true,
      ...overrides,
    });
  }

  /**
   * Get environment-specific configuration
   */
  static fromEnvironment(env = process.env.NODE_ENV): BuildConfig {
    switch (env) {
      case "production":
        return BuildConfig.production();
      case "staging":
        return BuildConfig.staging();
      case "development":
      default:
        return BuildConfig.development();
    }
  }
}

// Export default configuration
export default BuildConfig.fromEnvironment();

// Export utility functions for custom builds
export const createBuildConfig = (options: Partial<BuildOptions> = {}) => {
  return new BuildConfig(options);
};

export const getBuildInfo = () => {
  const config = BuildConfig.fromEnvironment();
  return config.getBuildInfo();
};

// Example usage configurations
export const buildConfigs = {
  // Standard production build
  production: BuildConfig.production(),

  // Development build with source maps
  development: BuildConfig.development(),

  // Staging build with analysis
  staging: BuildConfig.staging(),

  // Custom build for GitHub Pages
  githubPages: new BuildConfig({
    mode: "production",
    outDir: "docs",
    sourcemap: false,
    minify: true,
  }),

  // Custom build with bundle analysis
  analyze: new BuildConfig({
    mode: "production",
    analyze: true,
    sourcemap: true,
  }),

  // Minimal build for testing
  minimal: new BuildConfig({
    mode: "production",
    minify: false,
    sourcemap: false,
    target: "esnext",
  }),
};
