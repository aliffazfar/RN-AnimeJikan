import {ENDPOINTS} from '@services/endpoints';
import {instance} from '@services/instance';

export const fetchTopAiring = async ({pageParam = 1}) => {
  const response = await instance.get(
    ENDPOINTS.topAiring + '?filter=airing' + `&page=${pageParam}`,
  );
  const data = await response.json();
  return data as fetchTopAiringResponse;
};
