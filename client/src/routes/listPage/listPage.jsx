import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const data = useLoaderData();
  // console.log(data);

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading....</p>}>
            <Await
              resolve={data.postsResponse}
              errorElement={<p>Error in Loading all the Posts</p>}
            >
              {
              (postsResponse) =>
                    postsResponse.data.map((post) => (
                      <Card key={post.id} item={post} />
                    ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading....</p>}>
          <Await
            resolve={data.postsResponse}
            errorElement={<p>Error in Loading all the Posts</p>}
          >
            {(postsResponse) => 
               <Map items={postsResponse.data}/>
            }
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
