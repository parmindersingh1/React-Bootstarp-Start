import React, { Component } from 'react';

import ApiCreatePage from '../ApiCreate/ApiCreatePage';
import Toast from '../../../../utils/Toast';
// import { createConfig } from '../store/apiCrud';
import { connect } from 'react-redux'
import { createConfig } from '../../../../store/api-registry/apiRegistryAction'

class ApiNewpage extends Component {
  state = {
    apiInfo: {
      apiName: '',
      apiPath: '',
      gitUrl: '',
      gitFolder: '',
      apiVersion:'',
      gitToken: '',
      apiCollection: '',
      apiSubCollection: '',
      tags: [],  
      apiInputTypes: [],
      joiningStrategy: '',
      jfJoinerTimeOut: 0,
      inputTypeSearch: '',
      apiOutputTypes: [],
      splitterStrategy:'',
      outputTypeSearch: '',
    },
  };
  onSubmitApi = async (api, actions, setStepNumber) => {
    console.log("api",api);
    // setStepNumber(0);
    const singleData = {
      ...api,
      jfJoinerTimeOut: api.apiInputTypes.length > 1 ? api.jfJoinerTimeOut:0,
      joiningStrategy: api.apiInputTypes.length > 1 ? api.joiningStrategy : "NOT_APPLICABLE",
      splitterStrategy:api.apiOutputTypes.length > 1 ? api.splitterStrategy: "NOT_APPLICABLE",
    }

    const apiData = {
      apiName: api.apiName,
      apiPath: api.apiPath,
      gitUrl: api.gitUrl,
      apiVersion:api.apiVersion,
      gitFolder: api.gitFolder,
      gitToken: api.gitToken,
      apiCollection: api.apiCollection,
      apiSubCollection: api.apiSubCollection,
      tags: api.tags.map(searchTag => (typeof searchTag === 'string' || searchTag instanceof String? searchTag : searchTag.value)),
      jfJoinerTimeOut: singleData.jfJoinerTimeOut,
      joiningStrategy: singleData.joiningStrategy,
      splitterStrategy:singleData.splitterStrategy ,
      apiInputTypes: api.apiInputTypes.reduce((result, input) => {
         result[input.name] = input.required;
         return result;
      }, {}),
      apiOutputTypes: api.apiOutputTypes.map(outPut=> (typeof outPut === 'string'? outPut : outPut.name)),
    };

    console.log(apiData)

   
    try {
      this.props.createConfig(apiData).then((res) => {
        console.log(res)
        actions.setSubmitting(false);
      setStepNumber(0);
      window.scrollTo(0, 0);
      Toast.successMsg('Api saved successfully');
      this.props.history.goBack();
      })
      // console.log('response create exam', response);
      
    } catch (error) {
      actions.setSubmitting(false);
        console.log(error)
        Toast.errorMsg('Something went wrong');
        window.scrollTo(0, 0);
    }

     
  };

  // showMessage(message, type) {
  //     // return null
  //     this.props.addToast(message, toastrConfig(type));
  // }

  render() {
    // const { exams, loading } = this.props;
    const { apiInfo } = this.state;

    return (
      <>
        <ApiCreatePage
          apiInfo={apiInfo}
          onSubmitApi={this.onSubmitApi}
        />
      </>
    );
  }
}
const mapActionsToProps = {
  createConfig
}

export default connect(null, mapActionsToProps)(ApiNewpage);
