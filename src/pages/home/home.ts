import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import {Geolocation} from '@ionic-native/geolocation';
import {Task} from "../../entities/task";
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{
    tasks: FirebaseListObservable<Task[]>;
    position = null;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public db: AngularFireDatabase,
              public auth: AuthProvider,
              public geolocation: Geolocation)
  {
      this.tasks = <FirebaseListObservable<Task[]>>db.list('/tasks');
  }

  ionViewDidLoad()
  {
      this.geolocation
          .getCurrentPosition()
          .then(position => this.position = position);
  }

  addTask()
  {
      let prompt = this.alertCtrl.create({
          title: 'New task',
          message: 'What is task do you have to do?',
          inputs: [
              {
                  name: 'task',
                  placeholder: 'Task'
              }
          ],
          buttons: [
              {text: 'Cancel'},
              {
                  text:'Add',
                  handler: data => {
                      this.tasks.push(new Task(data.task))
                  }
              }
          ]
      });

      prompt.present();
  }

  editTask(task)
  {
      let prompt = this.alertCtrl.create({
          title: 'Edit task',
          message: 'Do you change ideia?',
          inputs: [
              {
                  name: 'task',
                  placeholder: 'Task',
                  value: task.name
              }
          ],
          buttons: [
              {text: 'Cancel'},
              {
                  text:'Save',
                  handler: data =>
                  {
                      task.name = data.task;
                      this.tasks.update(task.$key, task);
                  }
              }
          ]
      });

      prompt.present();
  }

  login()
  {
      this.auth.loginWithFacebook();
  }

  removeTask(task)
  {
     this.tasks.remove(task.$key);
  }
}
