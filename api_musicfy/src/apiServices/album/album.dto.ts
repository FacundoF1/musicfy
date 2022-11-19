const single = (resource: any) => ({
  id: resource._id,
  username: resource.username,
  email: resource.email
});

const multiple = (resources: any) =>
  resources.map((resource: any) => single(resource));

export default {
  single,
  multiple
};
