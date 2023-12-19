import numpy as np
import json

# Example array of points (replace this with your own data loading)
path = 'data/1/pc/0.npy'
points = np.load(path)
# Convert the numpy array to a list of dictionaries
points_list = {"x": points[:,0].tolist(), "y": points[:,1].tolist(), "z": points[:,2].tolist()}


# Convert the list of dictionaries to JSON format
points_json = json.dumps(points_list, indent=4)

# Save or print the resulting JSON

with open(path.replace('npy','json'), 'w') as file:
    file.write(points_json)
