const axios = require("axios");
const flower = require("../models/flower.model");

const getApi = (req, res) => {
    axios.get('https://flowers-api-13.herokuapp.com/getFlowers')
        .then(result => {
            res.status(200).json(result.data.flowerslist)
        })
        .catch(err => {
            res.status(500).json(err)

        })

}



const addFlower = (req, res) => {

    const slug = req.body.name.split(' ').join('-')
    flower.find({ email: req.body.email, slug: slug }, (error, found) => {
        if (found.length > 0) {
            res.status(201).json('already exist')

        } else {
            const {
                instructions,
                photo,
                name,
                email
            } = req.body
            const newFlower = new flower({
                instructions: instructions,
                photo: photo,
                name: name,
                email: email,
                slug: slug
            })
            newFlower.save()
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => {
                    res.status(500).json(err.message)

                })
        }
    })


}


const updateFlower = (req, res) => {
    const slug = req.body.name.split(' ').join('-')
    flower.findOne({ email: req.body.email, slug: req.body.slug })
        .then(result => {
            if (result) {
                const {
                    instructions,
                    photo,
                    name
                } = req.body

                result.instructions = instructions;
                result.photo = photo;
                result.name = name;
                result.slug = slug;

                result.save()
                res.status(200).json(result)

            } else {
                res.status(201).json('Not exist')

            }
        })
        .catch(err => {
            res.status(500).json(err.message)

        })
}

const deleteFlower = (req, res) => {

    flower.findOneAndDelete({ email: req.params.email, slug: req.params.slug})
        .then(result => {
            if (result) {

                res.status(200).json(result)

            } else {
                res.status(201).json('Not exist')

            }
        })
        .catch(err => {
            res.status(500).json(err.message)

        })

}

const getFav = (req, res) => {

    flower.find({ email: req.params.email } )
        .then(result => {
        if (result) {

            res.status(200).json(result)

        } else {
            res.status(201).json('Not exist')

        }
    })
    .catch(err => {
        res.status(500).json(err.message)

    })


}





module.exports = { getApi, addFlower, updateFlower, deleteFlower,getFav }

