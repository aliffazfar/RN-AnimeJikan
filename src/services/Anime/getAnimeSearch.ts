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

export type AnimeStatus = 'airing' | 'complete' | 'upcoming';

export interface getAnimeSearchProps {
  status?: AnimeStatus;
  q?: string;
  pageParam?: number;
  rating?: 'g' | 'pg' | 'pg13' | 'r17' | 'r' | 'rx';
  order_by?: AnimeOrderBy;
}

export const getAnimeSearch = async (props: getAnimeSearchProps) => {
  const queryParams = new URLSearchParams();

  if (props.status) {
    queryParams.append('status', props.status);
  }
  if (props.q) {
    queryParams.append('q', props.q);
  }
  if (props.pageParam) {
    queryParams.append('page', props.pageParam.toString());
  }
  if (props.rating) {
    queryParams.append('rating', props.rating);
  }
  if (props.order_by) {
    queryParams.append('order_by', props.order_by);
  }

  const endpoint = `${ENDPOINTS.getAnimeSearch}?${queryParams}`;
  const response = await instance.get(endpoint);
  const data = await response.json();
  return data as getAnimeSearchResponse;
};
