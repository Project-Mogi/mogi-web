import react from '@vitejs/plugin-react';
import { existsSync, readFileSync } from 'node:fs';
import { type ServerOptions as HttpsServerOptions } from 'node:https';
import { isAbsolute, resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

const DEFAULT_LOCAL_CERT_PATHS = {
  cert: '.cert/localhost.pem',
  key: '.cert/localhost-key.pem',
};

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const https = command === 'serve' ? getLocalHttpsOptions(env) : undefined;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      https,
    },
    preview: {
      https,
    },
  };
});

function getLocalHttpsOptions(env: Record<string, string>): HttpsServerOptions | undefined {
  if (env.VITE_DEV_SERVER_HTTPS !== 'true') {
    return undefined;
  }

  const keyPath = resolveProjectPath(
    env.VITE_DEV_SERVER_HTTPS_KEY ?? DEFAULT_LOCAL_CERT_PATHS.key,
  );
  const certPath = resolveProjectPath(
    env.VITE_DEV_SERVER_HTTPS_CERT ?? DEFAULT_LOCAL_CERT_PATHS.cert,
  );

  if (!existsSync(keyPath) || !existsSync(certPath)) {
    throw new Error('로컬 HTTPS 인증서 파일을 찾을 수 없습니다');
  }

  return {
    cert: readFileSync(certPath),
    key: readFileSync(keyPath),
  };
}

function resolveProjectPath(path: string) {
  return isAbsolute(path) ? path : resolve(process.cwd(), path);
}
