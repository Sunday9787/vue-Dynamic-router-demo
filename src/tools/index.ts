interface GenerateRoutesPayload {
  name?: string;
  children?: GenerateRoutesPayload[];
}

export function filterAsyncRouter(source: GenerateRoutesPayload[], roleSheet: GenerateRoutesPayload[]): GenerateRoutesPayload[] {
  const target: GenerateRoutesPayload[] = [];
  source.forEach((route, i) => {
    const tmp = { ...route };
    roleSheet.forEach((role) => {
      if (role.name === route.name) {
        if (tmp.children && role.children) {
          tmp.children = filterAsyncRouter(tmp.children, role.children);
        }
        target.push(tmp);
      }
    });
  });
  return target;
}
