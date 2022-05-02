import axios from "axios";

const instance = axios.create({});

export interface ApiResponse<T> {
  message: string;
  detail: string | null;
  data: T;
}

export interface Entity {
  _id: string;
  dir: string;
  base: string;
  attributes: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export enum FacetSortType {
  Asc = 1,
  Des = -1,
}
export interface Facet {
  id: string;
  key: string;
  sort: FacetSortType;
}

const createEntity = async (entity: Entity) =>
  instance
    .post<ApiResponse<Entity>>("/api/entities", entity)
    .then(({ data }) => data);

const readEntity = async (id: string) =>
  instance
    .get<ApiResponse<Entity>>(`/api/entities/${id}`)
    .then(({ data }) => data);

const updateEntity = async (entity: Entity) =>
  instance
    .post<ApiResponse<Entity>>(`/api/entities/${entity._id}`, entity)
    .then(({ data }) => data);

const deleteEntity = async (id: string) => {
  console.log("deleteEntity", id);
  return instance
    .delete<ApiResponse<null>>(`/api/entities/${id}`)
    .then(() => null);
};

const listEntities = async () =>
  instance.get<ApiResponse<Entity[]>>("/api/entities").then(({ data }) => data);

const createFacet = async (facet: Omit<Facet, "id">) =>
  instance
    .post<ApiResponse<Facet>>("/api/facets", facet)
    .then(({ data }) => data);

const deleteFacet = async (id: string) =>
  instance.delete<ApiResponse<null>>(`/api/facets/${id}`).then(() => null);

const listFacets = async () =>
  instance.get<ApiResponse<Facet[]>>("/api/facets").then(({ data }) => data);

export const api = {
  createEntity,
  readEntity,
  updateEntity,
  deleteEntity,
  listEntities,
  createFacet,
  deleteFacet,
  listFacets,
};
