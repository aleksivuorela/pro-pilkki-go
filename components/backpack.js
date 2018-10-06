export default backpack = {
  catchedFish : []
};

export const getCatchedFish = () => {
  let catched = {};
  this.backpack.catchedFish.forEach(f => {
    if (!catched[f.type]) catched[f.type] = 1;
    else catched[f.type] = catched[f.type] + 1;
  });

  return catched;
}
