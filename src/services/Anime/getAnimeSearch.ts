import {ENDPOINTS} from '@services/endpoints';
import {instance} from '@services/instance';

export const getAnimeSearch = async ({pageParam = 1, query = ''}) => {
  const response = await instance.get(
    ENDPOINTS.getAnimeSearch + `?q=${query}` + `&page=${pageParam}`,
  );
  const data = await response.json();
  return data as fetchTopAiringResponse;
};
