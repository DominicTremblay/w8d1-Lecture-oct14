import React from 'react';
import { render, prettyDOM, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LiveSearch from 'components/LiveSearch';
import axios from 'axios';

jest.mock('axios');

const data = {
  "resultCount": 1,
  "results": [
      {
          "wrapperType": "collection",
          "collectionType": "Album",
          "artistId": 876636555,
          "collectionId": 874928227,
          "artistName": "Rilès",
          "collectionName": "Vanity Plus Mind",
          "collectionCensoredName": "Vanity Plus Mind",
          "artistViewUrl": "https://music.apple.com/ca/artist/ril%C3%A8s/876636555?uo=4",
          "collectionViewUrl": "https://music.apple.com/ca/album/vanity-plus-mind/874928227?uo=4",
          "artworkUrl60": "https://is2-ssl.mzstatic.com/image/thumb/Music2/v4/a8/11/00/a811002c-2441-76ac-e393-42280d124bfb/source/60x60bb.jpg",
          "artworkUrl100": "https://is2-ssl.mzstatic.com/image/thumb/Music2/v4/a8/11/00/a811002c-2441-76ac-e393-42280d124bfb/source/100x100bb.jpg",
          "collectionPrice": 6.93,
          "collectionExplicitness": "explicit",
          "contentAdvisoryRating": "Explicit",
          "trackCount": 7,
          "copyright": "℗ 2014 Rilès",
          "country": "CAN",
          "currency": "CAD",
          "releaseDate": "2014-05-08T07:00:00Z",
          "primaryGenreName": "Hip-Hop/Rap"
      }
  ]
};


describe('LiveSearch', () => {
  
  

// This test works when the backend is running
  test.skip('it renders without crashing', async () => {

    const {getByPlaceholderText, getByText} = render(<LiveSearch />);

    const search = getByPlaceholderText(/search artists/i);

    
    fireEvent.change(search, {target: {value: 'Riles'}});
    const result = await waitForElement(() => getByText('Vanity Plus Mind'));

    expect(result).toHaveTextContent('Vanity Plus Mind');

  });

  // This test works without any backend by mocking the axios request
  test('it loads data and renders for artists', async() => {
  
    const {getByPlaceholderText, getByText} = render(<LiveSearch />);
    
    const search = getByPlaceholderText(/search artists/i);
    fireEvent.change(search, {target: {value: 'Riles'}});
    axios.get.mockResolvedValue({data});

    const result = await waitForElement(() => getByText('Vanity Plus Mind'));

    expect(result).toHaveTextContent('Vanity Plus Mind');

  })




});
