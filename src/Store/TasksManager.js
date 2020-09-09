import { observable, action, computed } from "mobx";
import * as helpers from "./Helpers";
const axios = require("axios");

export class TasksManager {
  @observable tasks = [];
  @observable details = [];

  @action getTasks = async () => {
    try {
      const resiveData = await axios.get(`http://localhost:8080/Data`);
      this.tasks = helpers.creatTasks(resiveData.data.tasks);
      this.details = helpers.creatDetails(resiveData.data.details);
    } catch (err) {
      return helpers.erorHandler(err);
    }
  };

  @action addTask = async (task) => {
    try {
      const newTask = await axios.post(`http://localhost:8080/Task`, task);
      this.tasks.push(helpers.creatTasks(newTask.data));
      return "The task was created successfully";
    } catch (err) {
      return helpers.erorHandler(err);
    }
  };

  @action deleteTask = async (taskId) => {
    
    try {
      const resiveData = await axios.delete(
        `http://localhost:8080/Task/${taskId}`
      );
      if (resiveData.data.tasks.length<0) {
        this.tasks = [];
      } else {
        this.tasks = helpers.creatTasks(resiveData.data.tasks);
      }
      if (resiveData.data.detail<0) {
        this.details = [];
      } else {
        this.details = helpers.creatDetails(resiveData.data.detail);
      }

      return "The task was deleted successfully";
    } catch (err) {
      return helpers.erorHandler(err);
    }
  };

  @action addDetail = async (detail) => {
    
    try {
      const newDetail = await axios.post(`http://localhost:8080/Detail`, detail);
      
      this.details.push(helpers.creatDetails(newDetail.data));
      return "The detail was created successfully";
    } catch (err) {
      return helpers.erorHandler(err);
    }
  };

  @action updateDetail = async (detailId) => {
    
    try {
      const resiveData =await  axios.put(`http://localhost:8080/Detail/${detailId}`);
      const task = this.tasks.find((t) => t.id == resiveData.data.task._id);
      const detail = this.details.find(
        (d) => d.id == resiveData.data.detail._id
      );
      task.isDone = resiveData.data.task.lastUpdate;
      detail.isDone = resiveData.data.detail.isDone;
    } catch (err) {
      return helpers.erorHandler(err);
    }
  };

  @action deleteDetail = async (detailId) => {
  
    try {
      const resiveData =await axios.delete(
        `http://localhost:8080/Detail/${detailId}`
      );
      const detailIndex = this.details.findIndex(
        (d) => d.id == resiveData.data
      );
      this.details.splice(detailIndex, 1);
    } catch (err) {
      return helpers.erorHandler(err);
    }
  };

  @computed get tasksSum() {
    return this.tasks.length;
  }
  @computed get detailDoneSum() {
    const detailDoneSum = this.details.filter((d) => d.isDone == true);
    return detailDoneSum.length;
  }
  @computed get detailOpenSum() {
    const detailOpenSum = this.details.filter((d) => d.isDone == false);
    return detailOpenSum.length;
  }
}
