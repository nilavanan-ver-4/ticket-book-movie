''' import json
import requests

def check_url(url):
    try:
        response = requests.head(url)
        return response.status_code == 200
    except requests.RequestException:
        return False

def process_json(file_path, output_file_path):
    # Load the JSON data from the file
    with open(file_path, 'r') as file:
        data = json.load(file)
    
    valid_entries = []
    
    for entry in data:
        if 'thumbnail' in entry and check_url(entry['thumbnail']):
            print(entry)
            valid_entries.append(entry)
    
    # Save the valid entries to the new JSON file
    with open(output_file_path, 'w') as file:
        json.dump(valid_entries, file, indent=4)
    
    print(f"Processed entries have been saved to '{output_file_path}'.")

# Example usage
file_path = '/home/nilavananan_ver_4/ticket-booking-movie/movies.json'
output_file_path = 'valid_movies-2020.json'
process_json(file_path, output_file_path) '''

import json

file_path = 'mov.json'

with open(file_path, 'r') as file:
    data = json.load(file)

# Now 'data' is a Python dictionary containing your JSON data
js_file_path = 'mov.js'

with open(js_file_path, 'w') as file:
    file.write('const moviesData = ')
    file.write(json.dumps(data, indent=2))  # Convert Python dictionary to JSON string and write to file
    file.write(';')
