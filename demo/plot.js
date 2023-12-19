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
    let xarray_file = await fetch('https://anyloc.github.io/data/trajectory_data/VPAIR_x_new.json');
    let yarray_file = await fetch('https://anyloc.github.io/data/trajectory_data/VPAIR_y_new.json');

    let xArray_json = await xarray_file.json();
    let yArray_json = await yarray_file.json();

    let ret_arr = [xArray_json,yArray_json];
    return ret_arr;
}

async function setSimilarityPlot(chosen_index)
{

    //set plot layout
    var trace1 = {
        x: x_array,
        y: y_array,
        mode: 'markers',
        marker: {
            size: 12,
            opacity: 0.5,
            colorscale: 'Greens'
        }
    };

    var data = [trace1];

    if(chosen_index==1)
    {
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
                "source": "https://anyloc.github.io/data/VPAir_images/VPAIR_Image.png",
                "xref": "x",
                "yref": "y",
                "x": 0,
                "y": 972,
                "sizex": 1434,
                "sizey": 972,
                "sizing": "stretch",
                "opacity": 1,
                "layer": "below"
            },
          ],
        title:'Similarity',
        hovermode:'closest',
        xaxis: {
            autorange: true,
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: true,
            ticks: '',
            // showticklabels: false
          },
          yaxis: {
            autorange: true,
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: true,
            ticks: '',
            // showticklabels: false
          }
    };
    }
    else
    {
        var layout =
        {
            title:'Similarity',
            hovermode:'closest',
        };
    }

    Plotly.newPlot('sim_myPlot', data, layout,{staticPlot: true});

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
            color:y_arrays_db[chosen_index],
            colorscale: 'viridis'
        },
        type: 'scatter3d'
    };

    var data = [trace1];

    if(chosen_index==1)
    {
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
        xaxis: {
            autorange: true,
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: true,
            ticks: '',
            // showticklabels: false
          },
          yaxis: {
            autorange: true,
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: true,
            ticks: '',
            // showticklabels: false
          }
    };
    }
    else
    {
        var layout =
        {
            title:'Similarity',
            hovermode:'closest',
        };
    }

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
            opacity: 0.5,
            colorscale: 'Greens',
        }
    };

    var data = [trace1];

    if (chosen_index==1)
    {
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
                "source": "https://anyloc.github.io/data/VPAir_images/VPAIR_Image.png",
                "xref": "x",
                "yref": "y",
                "x": 0,
                "y": 972,
                "sizex": 1434,
                "sizey": 972,
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
    }
    else
    {
        var layout =
        {
            title:'Trajectory',
            hovermode:'closest',
        };
    }


    Plotly.newPlot('myPlot', data, layout);

    // event listener to update images
    myPlot.on('plotly_click', function(data)
    {
        if (chosen_index==0)
        {
        //set query image
        const q_image = document.getElementById("q_image");
        let q_num = data.points[0].pointNumber;
        q_image_num = q_num+127;
        q_image.src =  "data/hawkins_images/"+q_image_num.toString()+".png";
        q_image.style.display = "block";

        //set database image
        const db_image = document.getElementById("db_image");
        let db_num = top_retrieval_arrays[chosen_index][q_num][0];
        db_image.src = "data/hawkins_images/"+db_num.toString()+".png";
        db_image.style.display = "block";
        }

        else if (chosen_index==1)
        {
        //set query image
        const q_image = document.getElementById("q_image");
        let q_num = data.points[0].pointNumber;
        // q_image_num = q_num;
        q_image_num = String(indices_arr_2[q_num]).padStart(5,'0');
        q_image.src =  "data/VPAir_images/subsampled_vpair/queries/"+q_image_num.toString()+".png";
        q_image.style.display = "block";

        //set database image
        const db_image = document.getElementById("db_image");
        let db_num = top_retrieval_arrays[chosen_index][q_num][0];

        lower_bound = parseInt(db_num/15)*15;
        upper_bound = (parseInt(db_num/15)+1)*15;

        if (db_num-lower_bound<8)
        {
            db_num = lower_bound;
        }
        else
        {
            db_num = upper_bound;
        }

        db_num = db_num+1;

        db_num = String(db_num).padStart(5,'0');
        // console.log(q_image_num,db_num);
        db_image.src = "data/VPAir_images/subsampled_vpair/reference_views/"+db_num.toString()+".png";
        db_image.style.display = "block";
        }

    });

    // event listener to update similarity plots
    myPlot.on('plotly_click', function(data){

        if(chosen_index==0)
        {
        var pn='',
            tn='',
            colors=[];
        for(var i=0; i < data.points.length; i++){
          pn = data.points[i].pointNumber;
          tn = data.points[i].curveNumber;
          colors = data.points[i].data.marker.color;
        };

        let q_num = data.points[0].pointNumber;
        // let color_nums = [];

        // for(var i=126;i>=0;i--)
        // {
        //     color_nums.push(i);
        // }
        let color_nums = Object.assign([],top_retrieval_arrays[chosen_index][q_num]);
        color_nums = color_nums.reverse();
        for(var i=0;i<color_nums.length;i++)
        {
            color_nums[i] = color_nums[i]/127;
        }

        for(var i=0;i<color_nums.length;i++)
        {
            if(color_nums[i]>=0.8)
                color_nums[i] = 0.8;
            else if(color_nums[i]<=0.3)
                color_nums[i] = 0.3;
        }

        // for(var i=0;i<color_nums.length;i++)
        // {
        //     if(color_nums[i]<0.3)
        //     {
        //         color_nums[i] = 0.3;
        //     }
        // }

        color_nums[0]=0;
        color_nums[100]=1;
        // console.log((top_retrieval_arrays[chosen_index][q_num][0]));


        color_nums[parseInt(top_retrieval_arrays[chosen_index][q_num][0])] = '#FCA510';
        // color_nums = color_nums.reverse();

        let marker_symb = new Array(color_nums.length).fill("circle");
        marker_symb[parseInt(top_retrieval_arrays[chosen_index][q_num][0])] = "star";
        // console.log((top_retrieval_arrays[chosen_index][q_num][0]));
        let custom_marker_size = new Array(color_nums.length).fill(12);
        custom_marker_size[parseInt(top_retrieval_arrays[chosen_index][q_num][0])] = 25;

        let custom_opacity = new Array(color_nums.length).fill(0.5);
        custom_opacity[parseInt(top_retrieval_arrays[chosen_index][q_num][0])] = 1;

        var update = {'marker':{color: color_nums , size:custom_marker_size,opacity: custom_opacity,colorscale: 'Hot',colorbar:{thickness: 20,showticklabels: false},symbol:marker_symb}};
        console.log(update);
        Plotly.restyle('sim_myPlot', update, [tn]);
        }

        else if(chosen_index==1)
        {
        var pn='',
            tn='',
            colors=[];
        for(var i=0; i < data.points.length; i++){
          pn = data.points[i].pointNumber;
          tn = data.points[i].curveNumber;
          colors = data.points[i].data.marker.color;
        };

        let q_num = data.points[0].pointNumber;
        let color_nums = new Array(181).fill(75);

        //the retrievals are not sub-sampled numbers, first need to sub-sample them.
        let cur_color=300;
        for(var i=0;i<top_retrieval_arrays[chosen_index][q_num].length;i++)
        {
            let lower_idx = 0;
            let upper_idx = 0;
            let subsampled_idx = 0;

            lower_idx = parseInt(top_retrieval_arrays[chosen_index][q_num][i]/15);
            upper_idx = (parseInt(top_retrieval_arrays[chosen_index][q_num][i]/15)+1);

            if (subsampled_idx-lower_idx<8)
            {
                subsampled_idx = lower_idx;
            }
            else
            {
                subsampled_idx = upper_idx;
            }

            // subsampled_idx = subsampled_idx+1;

            if(color_nums[subsampled_idx]==75)
            {
                color_nums[subsampled_idx] = cur_color;
                cur_color = cur_color - 20;
            }
        }

        //normalize
        for (var i=0;i<color_nums.length;i++)
        {
            color_nums[i] = color_nums[i]/400;

        }

        //hack to avoid auto-rescaling
        color_nums[0] = 1;
        color_nums[135]= 0;

        //TODO : Subsampled scheme, needs to be debugged for adding missing images

        let marker_symb = new Array(181).fill("circle");
        marker_symb[parseInt(top_retrieval_arrays[chosen_index][q_num][0]/15)] = "star";

        let custom_marker_size = new Array(181).fill(12);
        custom_marker_size[parseInt(top_retrieval_arrays[chosen_index][q_num][0]/15)] = 25;

        let custom_opacity = new Array(181).fill(0.5);
        custom_opacity[parseInt(top_retrieval_arrays[chosen_index][q_num][0]/15)] = 1;

        color_nums[parseInt(top_retrieval_arrays[chosen_index][q_num][0]/15)] = '#FCA510';
        var update = {'marker':{color: color_nums , size:custom_marker_size, opacity: custom_opacity, colorscale: 'Hot',colorbar:{thickness: 20, showticklabels: false},symbol:marker_symb}};

        Plotly.restyle('sim_myPlot', update, [tn]);
        console.log(update['marker']);

        }});
};


async function updateTrajectory()
{
    //update trajectory plots
    setTrajectoryPlot(countrySelector.selectedIndex);
    setSimilarityPlot(countrySelector.selectedIndex);
}

async function setup_demo()
{

// load and organize JSON into arrays for qu, db and retrievals
returned_arr = await load_arr();

x_array = returned_arr[0];
y_array = returned_arr[1];


//default trajectory
setTrajectoryPlot(1);
setSimilarityPlot(1);
set3DPlot(1);
//set event listener
countrySelector.addEventListener('change', updateTrajectory, false);
}

setup_demo();
