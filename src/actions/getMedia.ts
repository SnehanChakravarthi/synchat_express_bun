import { downloadMedia, type DownloadMediaResponse } from './downloadMedia';

const headers = {
  Authorization: `Bearer ${process.env['ACCESS_TOKEN']}`,
  'Content-Type': 'application/json',
};

interface MediaURLResponse {
  url?: string;
}

/**
 * Retrieves media from Facebook Graph API based on the provided ID, MIME type, and media type.
 * @param id - The ID of the media.
 * @param mimeType - The MIME type of the media.
 * @param mediaType - The type of the media.
 * @returns A Promise that resolves to the downloaded media URL, or undefined if no URL is found.
 */
export const getMedia = async (
  id: string,
  mimeType: string,
  mediaType: string
): Promise<DownloadMediaResponse | undefined> => {
  const url = `https://graph.facebook.com/v18.0/${id}/`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = (await response.json()) as MediaURLResponse;

    if (responseData && responseData.url) {
      console.log('Media URL:', responseData.url);
      return downloadMedia(responseData.url, mimeType, mediaType);
    } else {
      console.error('No URL found in the media response');
    }
  } catch (error) {
    console.error('An error occurred while fetching media:', error);
  }
};
