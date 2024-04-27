import {ENDPOINTS} from '@services/endpoints';
import {instance} from '@services/instance';

export type AnimeOrderBy =
  | 'mal_id'
  | 'title'
  | 'start_date'
  | 'end_date'
  | 'episodes'
  | 'score'
  | 'scored_by'
  | 'rank'
  | 'popularity'
  | 'members'
  | 'favorites';

export interface getAnimeSearchProps {
  status?: 'airing' | 'complete' | 'upcoming';
  q?: string;
  pageParam?: number;
  rating?: 'g' | 'pg' | 'pg13' | 'r17' | 'r' | 'rx';
  order_by?: AnimeOrderBy;
}

export const getAnimeSearch = async (props: getAnimeSearchProps) => {
  let endpoint = ENDPOINTS.getAnimeSearch;

  const queryParams = [];
  if (props.status) {
    queryParams.push(`status=${props.status}`);
  }
  if (props.q) {
    queryParams.push(`q=${props.q}`);
  }
  if (props.pageParam) {
    queryParams.push(`page=${props.pageParam}`);
  }
  if (props.rating) {
    queryParams.push(`rating=${props.rating}`);
  }
  if (props.order_by) {
    queryParams.push(`order_by=${props.order_by}`);
  }

  if (queryParams.length > 0) {
    endpoint += `?${queryParams.join('&')}`;
  }

  const response = await instance.get(endpoint);
  const data = await response.json();
  return data as getAnimeSearchResponse;
};
