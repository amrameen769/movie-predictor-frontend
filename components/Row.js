
function Row(){
  return(
<div className="bg-white">
  <div className="flex overflow-y-hidden overflow-x-scroll p-10 h-max">
    {[...new Array(100)].map((data, index) => (
    <img key={index} className="banner-row" src="https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_FMjpg_UX1000_.jpg" />
    ))}
  </div>
</div>
);
}
export default Row;