class FetchError extends Error {}

export function fetchJson (path:string): Promise<any> {
  return fetch(path)
    .then(
      response => {
        if (response.status === 404) {
          throw new FetchError(`File '${path}' not found.`);
        }
        else if (response.status < 200 || response.status >= 300) {
          throw new FetchError(`Error while loading '${path}'.`);
        }
        return response.json()
      },
      error => {
        console.warn(`A problem occured while starting to fetch the file '${path}'.`, error);
        throw new FetchError(`An internal problem happen.`);
      }
    )
    .catch(error => {
      if (error instanceof FetchError) {
        throw error;
      }
      throw new FetchError(`Couldn't parse '${path}'. Make sure it's a valid JSON.`);
    });
}

export function fetchBlob (path:string): Promise<any> {
  return fetch(path)
    .then(
      response => {
        if (response.status === 404) {
          throw new FetchError(`File '${path}' not found.`);
        }
        else if (response.status < 200 || response.status >= 300) {
          throw new FetchError(`Error while loading '${path}'.`);
        }
        return response.blob()
      },
      error => {
        console.warn(`A problem occured while starting to fetch the file '${path}'.`, error);
        throw new FetchError(`An internal problem happen.`);
      }
    )
    .catch(error => {
      if (error instanceof FetchError) {
        throw error;
      }
      throw new FetchError(`Couldn't transform '${path}' to blob.`);
    });
}