export default (
  id: string,
) => (
  state: store.ReducersI,
) => (
  state
    .galeries
    .galeries[id]
    ? state
      .galeries
      .galeries[id]
      .frames
      .end
    : true
);
