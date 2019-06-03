import React, {Component} from 'react';


const withLoadData = (ChildComponent) => (

  class extends Component {

    componentDidMount(){
      this.init()
    }

    init = () => {
      const business = this.props.navigation.getParam("carWash");
      this.props.$getServicePackages(business.id);
      this.props.$getPriceService(business.id);
    };

    render() {
      return <ChildComponent {...this.props}/>
    }
  }

);

export default withLoadData;
