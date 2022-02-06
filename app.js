// const { render } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')

const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://danlideng:p20asswor22d@cluster0.aglrs.mongodb.net/note-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  // .then((result) => console.log('connected to mongodb'))
  // to test connection

  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
// for POSTconst Blog = require('./models/blog');

app.use(morgan('dev'))
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
// mongo sandbox routes

// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'I have a dream 2',
//     snippet: 'Denny is having a dream...',
//     body: 'more about Denny is dreaming'
//   });

//   blog.save()const Blog = require('./models/blog');
//       console.log(err);
//     })
// })

// above code would make two exact records...do not why?


// app.get('/single-blog', (req, res) => {
//   Blog.findById('61e5f30b85a979417fe91888')
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// })

// routes
app.get('/', (req, res) => {
  const Blog = require('./models/blog');
  res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});


app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
})