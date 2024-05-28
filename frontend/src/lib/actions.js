'use server';
import apiService from '@/services/apiService';

import setSessionCookies, {
  deleteSessionCookies,
} from '@/lib/helpers';
import {getUserId, getProfileId} from '@/lib/helpers';
import {revalidatePath} from 'next/cache';
import { parseDate } from './utils';

export async function checkUser () {
  try {
    const userId = getUserId ();
    if (userId) return userId;
    else return undefined;
  } catch (error) {
    console.error ('Error checking user:', error.message);
    throw error;
  }
}

export async function login (formData) {
  try {
    const response = await apiService.postWithoutToken (
      'auth/login/',
      JSON.stringify (formData)
    );

    if (response.access) {
      await setSessionCookies (
        response.user,
        response.access,
        response.refresh
      );
    }
    return response;
  } catch (error) {
    // Handle errors
    console.error ('Error occurred during signing in:', error);

    throw error;
  }
}

export async function signup (formData) { 
  try {
    const data = {
      email: formData.email,
      password1: formData.password1,
      password2: formData.password2,
      first_name: formData.firstname,
      last_name: formData.lastname,
      username: formData.username,
    };
    const response = await apiService.postWithoutToken (
      'auth/registration/',
      JSON.stringify (data)
    );
    if (response.access) {
      await setSessionCookies (
        response.user,
        response.access,
        response.refresh
      );
    }
    return response;
  } catch (error) {
    // Handle errors
    console.error ('Error occurred during signing up:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

export async function logout () {
  try {
    deleteSessionCookies ();
  } catch (error) {
    // Handle errors
    console.error ('Error occurred during signing ing:', error);

    throw error; // Re-throw the error to be caught by the caller
  }
}

export async function fetchProfile () {
  try {
    const profileId = getProfileId ();
    if (!profileId) throw new Error ('User is not logged in!');
    const response = await apiService.get (`profile/${profileId}`);

    return response;
  } catch (error) {
    console.error ('Error occured during fetching profile: ', error);
    throw error;
  }
}

export async function handleImageUpload (formState) {
  try {
    const profileId = getProfileId ();
    const response = await apiService.postFile (
      `profile/${profileId}/upload-image/`,
      formState,
      'POST'
    );
    console.log (response);
    if (response.id) {
      revalidatePath (`/`);
    } else {
      throw new Error (`Response: ${response}`);
      // Handle error
    }
  } catch (error) {
    console.error ('Error uploading file:', error);
    // Handle error
    throw error;
  }
}

export async function updateProfile (formData) {
  try {
    const data = {
      email: formData.email,
      first_name: formData.firstname,
      last_name: formData.lastname,
      username: formData.username,
    };

    const response = await apiService.postUpdate (
      `auth/user/`,
      JSON.stringify (data),
      'PUT'
    );

    if (response.id) {
      revalidatePath (`/profile/${data.username}`);
    } else {
      throw new Error (`Response: ${response}`);
    }
  } catch (error) {
    // Handle errors
    console.error ('Error occurred during signing up:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}


export async function uploadFile(formData) {
  try {
    // Make a POST request to the file upload endpoint
    const response = await apiService.postFile('league/csv_uploads/', formData, 'POST');
    
    // Handle the response accordingly
    if (response.status === 'File uploaded successfully') {
      console.log('File uploaded successfully:', response);
      return response;
    } else {
      console.error('Error uploading file:', response);
      throw new Error('Failed to upload file');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function getTeams() {
  try {
    const response = await apiService.get('league/teams/');
    return response;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
}