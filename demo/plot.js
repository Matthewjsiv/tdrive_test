//declare variables
let xArray_1;
let yArray_1;
let xArray_2;
let yArray_2;

let xArray_1_db;
let yArray_1_db;
let xArray_2_db;
let yArray_2_db;

let indices_arr_2;

let x_arrays;
let y_arrays;

let x_arrays_db;
let y_arrays_db;

let top_retrieval_arrays;
let top_retrieval_array_1;
let top_retrieval_array_2;

let colors;

async function load_arr()
{
    let xarray_file = await fetch('https://matthewjsiv.github.io/tdrive_test.github.io/data/trajectory_data/x.json');
    let yarray_file = await fetch('https://matthewjsiv.github.io/tdrive_test.github.io/data/trajectory_data/y.json');

    let xArray_json = await xarray_file.json();
    let yArray_json = await yarray_file.json();

    let ret_arr = [xArray_json,yArray_json];
    return ret_arr;
}

async function load_cloud(fpath)
{
    let file = await fetch(fpath);

    let json = await file.json();
    return json;
}


async function set3DPlot(chosen_index)
{

    //set plot layout
    var trace1 = {
        x: x_array,
        y: y_array,
        z: y_array,
        mode: 'markers',
        marker: {
            size: 1,
            opacity: 1,
            color:y_array,
            colorscale: 'viridis'
        },
        type: 'scatter3d'
    };

    var data = [trace1];


    var layout = {
        autosize: true,
        width: 500,
        height: 400,
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
            pad: 0
          },
        title:'Pointcloud',
        hovermode:'closest',
        scene: {
        xaxis: {
            autorange: true,
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: false,
            ticks: '',
            // visible:false
            // showticklabels: false
          },
          yaxis: {
            autorange: true,
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: false,
            ticks: '',
            // visible:false
            // showticklabels: false
          },
          zaxis: {
            autorange: true,
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: false,
            ticks: '',
            // visible:false
            // showticklabels: false
          }

        }
    };



    Plotly.newPlot('myPlot3D', data, layout);

}

async function setTrajectoryPlot(chosen_index)
{

    //set plot layout
    var trace1 = {
        x: x_array,
        y: y_array,
        mode: 'markers',
        marker: {
            size: 12,
            opacity: 1,
            colorscale: 'Greens',
        }
    };

    var data = [trace1];

    var layout = {
        autosize: true,
        width: 500,
        height: 400,
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
            pad: 0
          },
        images: [
            {
                "source": "https://matthewjsiv.github.io/tdrive_test.github.io/data/gascola_earth.png",
                "xref": "x",
                "yref": "y",
                "x": 0,
                "y": 744,
                "sizex": 544,
                "sizey": 744,
                "sizing": "stretch",
                "opacity": 1,
                "layer": "below"
            },
          ],
        title:'Trajectory',
        hovermode:'closest',
        xaxis: {
            autorange: true,
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: true,
            ticks: '',
            showticklabels: false
          },
          yaxis: {
            autorange: true,
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: true,
            ticks: '',
            showticklabels: false
          }
    };



    Plotly.newPlot('myPlot', data, layout);

    // event listener to update images
    myPlot.on('plotly_click', function(data)
    {
        let area = data.points[0].pointNumber;

        let dir = "data/"+area.toString();

        const q_image = document.getElementById("q_image");

        let fpv_path = dir + "/fpv/0.png";
        q_image.src =  fpv_path;
        // db_image.style.display = "block";
    });



    myPlot.on('plotly_click',async function(data){

      let area = data.points[0].pointNumber;

      // let pts_file = await fetch('https://matthewjsiv.github.io/tdrive_test.github.io/data/' + area.toString() + '/pc/0.json');

      new_cloud = await load_cloud('https://matthewjsiv.github.io/tdrive_test.github.io/data/trajectory_data/x.json');
      console.log(new_cloud)
      //set plot layout
      var trace1 = {
          x: new_cloud,
          y: new_cloud,
          z: new_cloud,
          mode: 'markers',
          marker: {
              size: 1,
              opacity: 1,
              color:new_cloud,
              colorscale: 'viridis'
          },
          type: 'scatter3d'
      };

      var data = [trace1];


      var layout = {
          autosize: true,
          width: 500,
          height: 400,
          margin: {
              l: 0,
              r: 0,
              b: 0,
              t: 0,
              pad: 0
            },
          title:'Pointcloud',
          hovermode:'closest',
          scene: {
          xaxis: {
              autorange: true,
              showgrid: false,
              zeroline: false,
              showline: false,
              autotick: false,
              ticks: '',
              // visible:false
              // showticklabels: false
            },
            yaxis: {
              autorange: true,
              showgrid: false,
              zeroline: false,
              showline: false,
              autotick: false,
              ticks: '',
              // visible:false
              // showticklabels: false
            },
            zaxis: {
              autorange: true,
              showgrid: false,
              zeroline: false,
              showline: false,
              autotick: false,
              ticks: '',
              // visible:false
              // showticklabels: false
            }

          }
      };



      Plotly.newPlot('myPlot3D', data, layout);
        });

};


// async function updateTrajectory()
// {
//     //update trajectory plots
//     setTrajectoryPlot(0);
//     setSimilarityPlot(0);
// }

async function setup_demo()
{

// load and organize JSON into arrays for qu, db and retrievals
returned_arr = await load_arr();
console.log(returned_arr);
x_array = returned_arr[0];
y_array = returned_arr[1];


//default trajectory
setTrajectoryPlot(1);
set3DPlot(1);
}

setup_demo();
