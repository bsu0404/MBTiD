interface Kakao {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Share: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendDefault: (options: any) => void;
  };
}

interface Window {
  Kakao: Kakao;
}
