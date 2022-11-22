const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../model/userschema');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate')
const Projects = require('../model/projectschema')
const upload = require('../middleware/upload')

require('../db/conn');


router.post('/register', async (req, res) => {
    const { name, email, work, password, cpassword } = req.body;

    if (!name || !email || !password || !cpassword) {
        return res.status(422).json({ error: "plz fill form correctly" });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            res.status(422).json({ err: "Email already existed" })
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Passwords are not matching" })

        }
        else {
            const user = new User({ name, email, work, password, cpassword })

            await user.save();
            res.status(200).json({ message: "user registered successfully" })
        }



    } catch (error) {
        console.log(error);
    }


})


//uploading projects

router.post('/upload', authenticate, upload.array('image'), async (req, res) => {
    const { branch, title, description, tech, reference, rating, email, teammember1, teammember2, teammember3, team1email, team2email, team3email } = req.body;
    console.log("before ?!")

    console.log(req.body)

    if (!branch || !title || !description || !tech) {
        return res.status(422).json({ branch, title, description, tech, email });
    }
    console.log("after ?!")
    try {
        let path = ''
        let dpath = ''
        let n = 0
        if (req.files) {

            req.files.forEach(function (files, index, arr) {
                path = path + files.path + ','

            })
            path = path.substring(0, path.lastIndexOf(","))

        }

        const project = new Projects({
            branch, title, email, description, tech, reference, rating, email: req.rootUser.email, image: path, teammember1, teammember2, teammember3, team1email, team2email, team3email
        });


        await project.save();

        res.send({ path })
    }
    catch (error) {
        console.log("this is error")
        console.log(error);
    }

})

router.post('/updatedoc', authenticate, upload.array('documentation'), async (req, res) => {

    const { docpath } = req.body

    console.log("in updatedoc")
    try {
        let path = ''
        // console.log(req.body.doc)
        if (req.files) {

            req.files.forEach(function (files, index, arr) {
                path = path + files.path + ','

            })
            path = path.substring(0, path.lastIndexOf(","))

        }

        console.log("before path auth")
        console.log(path)

        console.log(docpath)
        const d = await Projects.findOne({ image: docpath })

        console.log(d)

        const ok = await Projects.updateOne(
            { image: docpath },
            {
                $set: { documentation: path }
            }
        )

        console.log(ok)


        res.send({ path })
    }
    catch (error) {
        console.log("this is error")
        console.log(error);
    }

})



//showcase

router.get('/showcase', async (req, res) => {
    const data = await Projects.find()
    // const data = await Projects.find({ email: req.rootUser.email })
    // console.log(typeof data)
    // console.log(data)
    res.send(data)
})

router.get('/loginshowcase', authenticate, async (req, res) => {
    const data = await Projects.find({ email: req.rootUser.email })
    console.log("in loginshowcase")
    res.send(data)
})

router.post('/noprofilelogin', async (req, res) => {
    const data = await User.findOne({ email: req.body.email })
    console.log("in noprofilelogin 123" + data)
    res.send(data)
})

router.post('/noprofileproject', async (req, res) => {
    const data = await Projects.find({ email: req.body.email })
    console.log("in noprofileproject 321" + req.body)
    res.send(data)
})



//login route

router.post('/signin', async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" })
        }


        const userLogin = await User.findOne({ email: email })


        if (!userLogin) {
            res.status(400).json({ error: "Invalid credentials email" })
        }
        else {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken()
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2589200000),
                httpOnly: true
            })

            if (!isMatch) {
                res.status(400).json({ error: "Invalid credentials password" })
            }
            else {
                res.json({ message: "user singnin successful" })

            }
        }


    } catch (error) {
        console.log(error)
    }
})




router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('user logged out');
})

router.get('/about', authenticate, (req, res) => {
    console.log("in about page")
    res.status(200).send(req.rootUser)
})

router.get('/check', authenticate, (req, res) => {
    res.send(req.rootUser)
})

router.post('/editproject', async (req, res) => {

    const { title, branch, tech, teammember1, teammember2, teammember3, description, _id } = req.body
    console.log("entering edit project")
    try {
        const ok = await Projects.updateOne(
            { _id: req.body._id },
            {
                $set: { title, branch, tech, teammember1, teammember2, teammember3, description }
            }
        )

        res.status(200).send({ message: "edited perfectly" })
    } catch (error) {
        console.log(error);
    }

})

router.post('/editprofile', authenticate, async (req, res) => {

    console.log("in edit profile")
    const { name, email, work, phone, linkedin, github, twitter, insta } = req.body
    console.log(req.body)
    try {
        const ok = await User.updateOne(
            { _id: req.body._id },
            {
                $set: { name, email, work, phone, linkedin, github, twitter, insta }
            }
        )

        console.log(ok);
        res.status(200).send({ message: "profile edited perfectly" })
    } catch (error) {
        console.log(error);
    }

})


router.get('/:id', async (req, res) => {
    const data = await Projects.find({ branch: req.params.id })
    res.send(data)
})




module.exports = router;