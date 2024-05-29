import {getAccessToken} from '@/lib/helpers';

const apiService = {
  get: async function (url) {
    console.log ('get', url);
    const accessToken = getAccessToken ();
    return new Promise ((resolve, reject) => {
      fetch (`${process.env.NEXT_PUBLIC_API_HOST}/${url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then (response => response.json ())
        .then (json => {
          resolve (json);
        })
        .catch (error => {
          reject (error);
        });
    });
  },

  postUpdate: async function (url, data, method) {
    const accessToken = getAccessToken ();
    return new Promise ((resolve, reject) => {
      fetch (`${process.env.NEXT_PUBLIC_API_HOST}/${url}`, {
        method: method,
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then (response => response.json ())
        .then (json => {
          console.log ('Reponse: ', json);
          resolve (json);
        })
        .catch (error => {
          reject (error);
        });
    });
  },

  postFile: async function (url, data, method) {
    const accessToken = getAccessToken ();
    return new Promise ((resolve, reject) => {
      fetch (`${process.env.NEXT_PUBLIC_API_HOST}/${url}`, {
        method: method,
        body: data,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then (response => response.json ())
        .then (json => {
          console.log ('Reponse: ', json);
          resolve (json);
        })
        .catch (error => {
          reject (error);
        });
    });
  },
  delete: async function (url) {
    const accessToken = getAccessToken();
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${url}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(async response => {
        // Check if the response status indicates success
        if (response.ok) {
          // Check if there's a body to parse
          const text = await response.text();
          return text ? JSON.parse(text) : {};
        } else {
          // Handle errors appropriately
          const text_2 = await response.text();
          const error = text_2 ? JSON.parse(text_2) : { error: 'Unknown error' };
          throw new Error(error.error || 'Delete request failed');
        }
      })
      .then(json => {
        console.log('Response:', json);
        resolve(json);
      })
      .catch(error => {
        console.error('Error deleting game:', error);
        reject(error);
      });
    });
  },
  

  postWithoutToken: async function (url, data) {
    console.log ('post', url, data);

    return new Promise ((resolve, reject) => {
      fetch (`${process.env.NEXT_PUBLIC_API_HOST}/${url}`, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then (response => response.json ())
        .then (json => {
          console.log ('Response:', json);

          resolve (json);
        })
        .catch (error => {
          reject (error);
        });
    });
  },
};

export default apiService;
