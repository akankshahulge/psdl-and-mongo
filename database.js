const express = require('express');
const app = express();
const studentModel = require('./model/mongo')
const client = require('./model/db');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/new')
.then((res)=>{
    console.log('connected to MONGODB database')
})
.catch((err)=>{
    console.log(err);
})

client.connect()
    .then(() => {
        console.log('connected to pg')
    })
    .catch((err) => {
        console.log('cannot connect to pg')
    })


app.use(express.json());

app.get('/students', (req, res) => {
    // client.connect()
    // .then(()=>{
    //     console.log('connected to pg')
    // })
    // .catch((err)=>{
    //     console.log('cannot connect to pg')
    // })

    client.query('SELECT * FROM public."students_record"', (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error executing query');
        } else {
            console.log('Query result:', result.rows);
            res.json(result.rows);
        }
        client.end();
    });
});

app.post('/students/addstudent', async(req, res) => {
    

    const studentArray = req.body.students;
    if (studentArray) {
        studentArray.map(
        (students) => {
            console.log(students.id, "and", students.name,"and",students.marks);
    
        client.query(
        'INSERT INTO public.students_record(id ,name,marks) VALUES ($1,$2,$3)',[students.id,students.name,students.marks],
        (err, result) => {
            console.log("why")
            if (err) {
                console.error('Error executing query', err);
                
            } else {
                console.log("connected to postgresql");
        
            }
        })

    }
)}
            const student = new studentModel({
                    students: req.body.students
                });

                try {
                    
                    await student.save();
                    res.status(201).json(student);

                }

                catch (error) {
                    console.log(error);
                    res.status(500).json({ message: "Something went wrong" });
                }




            }
        );
    
        
app.listen(8000, () => {
    console.log('Server started on port 8000');
});
