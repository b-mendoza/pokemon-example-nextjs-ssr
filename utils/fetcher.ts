export async function fetcher<Result = Record<string, unknown>>(url: string) {
  const response = await fetch(url);

  return await (response.json() as Promise<Result>);
}
