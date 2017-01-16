import notify from './notify';

export function handleError(req){
  notify.error(req.message);
}
