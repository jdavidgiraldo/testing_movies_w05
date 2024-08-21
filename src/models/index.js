const Actor = require('./Actor')
const Director = require('./Director')
const Genre = require('./Genre')
const Movie = require('./Movie')

Movie.belongsToMany(Director, { through: 'moviesDirectors' })

Movie.belongsToMany(Actor, { through: 'moviesActors' })

Movie.belongsToMany(Genre, { through: 'moviesGenres' })
