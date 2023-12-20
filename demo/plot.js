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

  let area = 0
  // let pts_file = await fetch('https://matthewjsiv.github.io/tdrive_test.github.io/data/' + area.toString() + '/pc/0.json');
  let cloud_dir = 'https://matthewjsiv.github.io/tdrive_test.github.io/data/' + area.toString() + '/full_cloud/0.json';
  new_cloud = await load_cloud(cloud_dir);
  // console.log(new_cloud)
  //set plot layout
  var trace1 = {
      x: new_cloud['x'],
      y: new_cloud['y'],
      z: new_cloud['z'],
      mode: 'markers',
      marker: {
          size: 1,
          opacity: 1,
          color:new_cloud['z'],
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
            visible:false
            // showticklabels: false
          },
          yaxis: {
            autorange: true,
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: false,
            ticks: '',
            visible:false
            // showticklabels: false
          },
          zaxis: {
            range: [-10,120],
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: false,
            ticks: '',
            visible:false
            // showticklabels: false
          }

        }
    };



    Plotly.newPlot('myPlot3D', data, layout);

}

async function setOdomPlot(chosen_index)
{

  let area = 0
  // let pts_file = await fetch('https://matthewjsiv.github.io/tdrive_test.github.io/data/' + area.toString() + '/pc/0.json');
  let so_dir = 'https://matthewjsiv.github.io/tdrive_test.github.io/data/' + area.toString() + '/super_odom/odometry.json';
  so_traj = await load_cloud(so_dir);

  let tartanvo_dir = 'https://matthewjsiv.github.io/tdrive_test.github.io/data/' + area.toString() + '/tartanvo_odom/odometry.json';
  tartanvo_traj = await load_cloud(tartanvo_dir);
  // console.log(new_cloud)
  //set plot layout
  var trace1 = {
      x: so_traj['x'],
      y: so_traj['y'],
      z: so_traj['z'],
      mode: 'markers',
      marker: {
          size: 1,
          opacity: 1
      },
      name: "Super Odometry",
      type: 'scatter3d'
  };

  var trace2 = {
      x: tartanvo_traj['x'],
      y: tartanvo_traj['y'],
      z: tartanvo_traj['z'],
      mode: 'markers',
      marker: {
          size: 1,
          opacity: 1
      },
      name: "TartanVO",
      type: 'scatter3d'
  };

    var data = [trace1, trace2];


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
        title:'Odometry',
        hovermode:'closest',
        showlegend: true,
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



    Plotly.newPlot('OdomPlot', data, layout);

}



async function setTrajectoryPlot(chosen_index)
{

    //set plot layout
    var trace1 = {
        // x: x_array,
        // y: y_array,
        x: [0,544],
        y: [0,744],
        mode: 'markers',
        marker: {
            size: 12,
            opacity: 0,
            colorscale: 'Greens',
        },
        name: "",
    };

    var trace2 = {
        // x: x_array,
        // y: y_array,
        x: [220,260],
        y: [544,100],
        mode: 'markers',
        marker: {
            size: 12,
            opacity: 1,
        },
        name: ""
    };

    var data = [trace1,trace2];

    var layout = {
        autosize: true,
        width: 543,
        height: 744,
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
                "sizex": 543,
                "sizey": 744,
                "sizing": "stretch",
                "opacity": 1,
                "layer": "below"
            },
          ],
        title:'Trajectory',
        hovermode:'closest',
        showlegend: false,
        // hoverdistance: 1000,
        xaxis: {
            autorange: true,
            // range: [0,543],
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: false,
            ticks: '',
            showticklabels: false
          },
          yaxis: {
            autorange: true,
            // range: [0,744],
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: false,
            ticks: '',
            showticklabels: false
          }
    };



    Plotly.newPlot('myPlot', data, layout);

    // event listener to update images
    myPlot.on('plotly_click', function(data)
    {
        let area = data.points[0].pointNumber;
        console.log(area)

        let dir = "data/"+area.toString();

        const q_image = document.getElementById("fpv_image");

        let fpv_path = dir + "/image_left_color/0.png";
        q_image.src =  fpv_path;
        q_image.style.display = "block";
    });

    myPlot.on('plotly_click', function(data)
    {
        let area = data.points[0].pointNumber;

        let dir = "data/"+area.toString();

        const q_image = document.getElementById("bev_image");

        let fpv_path = dir + "/rgb_map/0.png";
        q_image.src =  fpv_path;
        // db_image.style.display = "block";
    });



    myPlot.on('plotly_click',async function(data){

      let area = data.points[0].pointNumber;

      // let pts_file = await fetch('https://matthewjsiv.github.io/tdrive_test.github.io/data/' + area.toString() + '/pc/0.json');
      let cloud_dir = 'https://matthewjsiv.github.io/tdrive_test.github.io/data/' + area.toString() + '/full_cloud/0.json';
      new_cloud = await load_cloud(cloud_dir);
      // console.log(new_cloud)
      //set plot layout
      var trace1 = {
          x: new_cloud['x'],
          y: new_cloud['y'],
          z: new_cloud['z'],
          mode: 'markers',
          marker: {
              size: 1,
              opacity: 1,
              color:new_cloud['z'],
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
              visible:false
              // showticklabels: false
            },
            yaxis: {
              autorange: true,
              showgrid: false,
              zeroline: false,
              showline: false,
              autotick: false,
              ticks: '',
              visible:false
              // showticklabels: false
            },
            zaxis: {
              // autorange: true,
              range: [-10,120],
              showgrid: false,
              zeroline: false,
              showline: false,
              autotick: false,
              ticks: '',
              visible:false
              // showticklabels: false
            }

          }
      };



      Plotly.react('myPlot3D', data, layout);
        });

        myPlot.on('plotly_click',async function(data){

          let area = data.points[0].pointNumber;
          // let pts_file = await fetch('https://matthewjsiv.github.io/tdrive_test.github.io/data/' + area.toString() + '/pc/0.json');
          let so_dir = 'https://matthewjsiv.github.io/tdrive_test.github.io/data/' + area.toString() + '/super_odom/odometry.json';
          so_traj = await load_cloud(so_dir);

          let tartanvo_dir = 'https://matthewjsiv.github.io/tdrive_test.github.io/data/' + area.toString() + '/tartanvo_odom/odometry.json';
          tartanvo_traj = await load_cloud(tartanvo_dir);
          // console.log(new_cloud)
          //set plot layout
          var trace1 = {
              x: so_traj['x'],
              y: so_traj['y'],
              z: so_traj['z'],
              mode: 'markers',
              marker: {
                  size: 1,
                  opacity: 1
              },
              name: "Super Odometry",
              type: 'scatter3d'
          };

          var trace2 = {
              x: tartanvo_traj['x'],
              y: tartanvo_traj['y'],
              z: tartanvo_traj['z'],
              mode: 'markers',
              marker: {
                  size: 1,
                  opacity: 1
              },
              name: "TartanVO",
              type: 'scatter3d'
          };

            var data = [trace1, trace2];


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
                title:'Odometry',
                hovermode:'closest',
                showlegend: true,
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



            Plotly.newPlot('OdomPlot', data, layout);
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
setOdomPlot(1);
}

setup_demo();
