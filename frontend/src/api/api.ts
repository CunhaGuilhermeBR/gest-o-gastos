export async function fetchData(endpoint: string, params?: Record<string, any>, method: 'GET' | 'POST' | 'PUT' = 'GET', body?: any) {
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_API_URL);

  if (params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }
  const response = await fetch(url.toString(), {
    method,
    headers: {
      'Authorization': process.env.NEXT_PUBLIC_API_TOKEN || '',
      'Content-Type': 'application/json'
    },
    body: method === 'GET' ? undefined : JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }

  if (method === 'GET' || endpoint === 'user/login') {
    return response.json();
  }
  return;
}
