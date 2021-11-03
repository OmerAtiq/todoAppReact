import React from "react"

import "../src/todo.css"
export default class App extends React.Component{

    state = {
        value : '',
        list:[],
        index:"",
        time:""
    }

    handlechange=(e)=>{
       
        this.setState({            
            value: e.target.value
        })

    }

    handlesubmit=(e)=>{
        e.preventDefault()
        let items = this.state.list
        let v = this.state.value
        let t = this.state.time
        if(!v){
            alert("please enter task")
        }
        else{
            items.push({v,t})
            this.setState({
                list : items,
                value:"",
                time:""
            })
        }
       
        
        
    }

    handleshiftup=(i)=>{
        if(i==0){
            alert("Already on the top")
        }
        else{
            let ary = this.state.list;
            let temp=ary[i-1];
            ary[i-1]=ary[i];
            ary[i]=temp;
            this.setState({
                list:ary
            })
        }
       
    }


    handleshiftdown=(i)=>{
        if(i==this.state.list.length-1){
            alert("Already on the bottom")
        }
        else{
            let ary = this.state.list;
            let temp=ary[i+1];
            ary[i+1]=ary[i];
            ary[i]=temp;
            this.setState({
                list:ary
            })
        }
       
    }

    delentry=(i)=>{
        let del = this.state.list
        del.splice(i,1)
        this.setState({
            list:del
        })
    }

    handleedit=(i)=>{
        let editop = this.state.list
        let ed = editop[i].v
        let tm = editop[i].t
        this.setState({
            // value: editop[i],
            value : editop[i].v,
            time : editop[i].t,
            index : i
        })
       

    }

    handleupdate=()=>{
        let newindex = this.state.index;
        let arr = this.state.list;
        arr[newindex].v=this.state.value;
        arr[newindex].t=this.state.time;
        this.setState({
            list:arr,
            value : "",
            time:''
            
        })

    }
    handletime=(e)=>{
        this.setState({
            time:e.target.value
            
        })

    }

    // comparetime=()=>{
    //     let date = new Date()
    //     let mytime  = date.toLocaleTimeString()
    //     let gettime = mytime.slice(0,5)
    //     console.log(gettime);
    //     this.state.list.map((ele)=>{
    //         return ele.t === gettime
    //     })
        
    // }

    comparetime=()=>{

        if(this.state.list.length > 0){
            let date = new Date()
            let min = date.toTimeString()
            let getTime = min.slice(0,5)
            // console.log(getTime);
            let dd = this.state.list.map((ele,i)=>{
                if(ele.t == getTime){
                    alert('alarm time matched')
                    let del = this.state.list
            del.splice(i,1)
            this.setState({
                list:del
         
            })
                }
            })
        }
        
        }





    render(){
        console.log(this.state);
        setInterval(this.comparetime,1000)
        
        let data = this.state.list.map((ele,i)=>{
           

            return(
                <tr key={i}>
                <td>{i+1}</td>
                <td>{ele.v}</td>
                <td>{ele.t}</td>

                
                <td>
                    <button className="btn btn-primary" onClick={()=>this.handleedit(i)}>Edit</button>
                    <button className="btn btn-danger" onClick={()=>this.delentry(i)}>Delete</button>
                    <button className="btn btn-primary" onClick={()=>this.handleshiftup(i)}>Shift Up</button>
                    <button className="btn btn-danger" onClick={()=>this.handleshiftdown(i)}>Shift Down</button>

                </td>
                

                </tr>
            )
        })
        return(
            <div>
                <form action=""  >
                    <h1 className="heading">TO DO List</h1>
                    <input type="text" className="myinp" value={this.state.value} onChange={this.handlechange} placeholder="Enter Task" />
                    <input type="time" className="timeinp " value={this.state.time} onChange={this.handletime} />

                </form>
                <button className="btn btn-primary updbtn" onClick={()=>this.handleupdate()}>Update</button>
                <button className="btn btn-primary addbtn" onClick={this.handlesubmit}>ADD</button>



                <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Tasks</th>
      <th scope="col">Time</th>
      <th scope="col">Operations</th>
    </tr>
  </thead>
  <tbody>
      {data}
  </tbody>
</table>

            </div>
        )
    }
}