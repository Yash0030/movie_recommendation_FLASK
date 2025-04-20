from flask import Flask,redirect,render_template,url_for,request
import requests
import pickle
import pandas as pd
import gdown
import os

app=Flask(__name__)

def download_similarity_file():
    file_id = "1HFz1alr0WFUIgf1yNqDWwOkHc0TnnXZS"
    url = f"https://drive.google.com/uc?id={file_id}"
    output = "similarity.pkl"

    if not os.path.exists(output):
        print("downloading similarity.pkl...")
        gdown.download(url, output, quiet=False)
        print("download complete.")
    else:
        print("similarity.pkl already exists.")
        


movies_list = pickle.load(open('movie_dict.pkl', 'rb'))
movies = pd.DataFrame(movies_list)
download_similarity_file()
similarity = pickle.load(open('similarity.pkl', 'rb'))
# print(movies.columns)
# print(movies['movie_id'].sample(1).values[0])
def poster(movie_id):
    resp=requests.get('https://api.themoviedb.org/3/movie/{}?api_key=c13a85b88737922c3ff1598a75a554f1&language=en-US'.format(movie_id))
    data=resp.json()
    return  "https://image.tmdb.org/t/p/w500" + data['poster_path']

def recommendations(movie):
    movie_index = movies[movies['title'] == movie].index[0]
    distances=similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:8]
    res_ids=[]
    for i in movies_list:
        movie_id= movies.iloc[i[0]].movie_id
        res_ids.append(movie_id)
    return res_ids 
        

@app.route('/')
def welcome():
    idx=[]
    urls=[]
    titles=[]
    idx=movies['movie_id'].sample(10).values
    for i in idx:
        title = movies.loc[movies['movie_id'] == i, 'title'].values[0]
        titles.append(title)
        url=poster(i)
        urls.append(url)
    all_movies = movies['title'].tolist()   
    
    return render_template('index.html',urls=urls,titles=titles,movies=all_movies)

@app.route('/recommend',methods=['POST','GET'])
def recommend():
    movie = request.form.get('movie')
    idx1=[]
    idx1=recommendations(movie)
    urls1=[]
    titles1=[]
    for i in idx1:
        title1 = movies.loc[movies['movie_id'] == i, 'title'].values[0]
        titles1.append(title1)
        url1=poster(i)
        urls1.append(url1)
    return render_template('recommendations.html',titles1=titles1,urls1=urls1)

if __name__=='__main__':
    app.run(debug=True)