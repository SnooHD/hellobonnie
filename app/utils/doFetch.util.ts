interface doFetchConfigProps extends RequestInit {
  timeout?: number;
}

export async function doFetch<T = any>(
  url: string,
  config: doFetchConfigProps = {
    timeout: 4000
  }
): Promise<T> {  
  const { timeout, ...restOfConfig } = config;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, 
    {
      ...restOfConfig,
      signal: controller.signal
    }
  );

  clearTimeout(timeoutId);

  if (response.ok) {
    const json = await response.json();
    return json;
  }

  const error = await response.json();
  throw {
    ...error,
    url
  };
}
  

