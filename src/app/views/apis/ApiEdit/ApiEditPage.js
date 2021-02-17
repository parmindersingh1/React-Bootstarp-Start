import React, { useEffect, useState } from "react";
// import { getApibyId, updateConfig } from "../store/apiCrud";

import { getApibyId, updateConfig } from "../../../../store/api-registry/apiRegistryAction";
import { connect } from "react-redux"
import ApiCreatePage from "../ApiCreate/ApiCreatePage";
import Toast from "../../../../utils/Toast";

const ApiEditPage = (props) => {
  const [apiInfo, setApiInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiId] = useState(props.match && props.match.params.id);

  useEffect(() => {
    setLoading(true);
    props.getApibyId(apiId).then((res) => {
      setApiData(res.data);
      console.log(res.data)
    })
    
    setLoading(false);
    
   
    // });
  }, [apiId]);


  const setApiData = (apiInfo) => {
    const tempApiInfo = {
      ...apiInfo,
      apiInputTypes: Object.entries(apiInfo.apiInputTypes).map(([key, val]) => ({
        name: key,
        required: val,
      })),
      apiOutputTypes: apiInfo.apiOutputTypes.map((type) => ({ name: type })),
    };

    setApiInfo(tempApiInfo);
  };

  const onSubmitApi = async (api, actions, setStepNumber) => {
    console.log("api", api, apiId);
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
      gitFolder: api.gitFolder,
      apiVersion:api.apiVersion,
      gitToken: api.gitToken,
      apiCollection: api.apiCollection,
      apiSubCollection: api.apiSubCollection,
      tags: api.tags.map((searchTag) =>
        typeof searchTag === "string"  || searchTag instanceof String ? searchTag : searchTag.value
      ),
      jfJoinerTimeOut: singleData.jfJoinerTimeOut,
      joiningStrategy: singleData.joiningStrategy,
      splitterStrategy:singleData.splitterStrategy ,
      apiInputTypes: api.apiInputTypes.reduce((result, input) => {
        result[input.name] = input.required;
        return result;
      }, {}),
      apiOutputTypes: api.apiOutputTypes.map((outPut) =>
        typeof outPut === "string" ? outPut : outPut.name
      ),
    };

    console.log("submitted Values", apiData);
    // Toast.errorMsg("Api Not Intergated Yet");
    // props.history.push("/apis");

    props.updateConfig(apiId, apiData)
     try {
      actions.setSubmitting(false);
      setStepNumber(0);
      window.scrollTo(0, 0);
      Toast.successMsg("Api updated successfully");
      props.history.goBack();
     } catch (error) {
      actions.setSubmitting(false);
      console.log(error);
      Toast.errorMsg("Something went wrong");
      window.scrollTo(0, 0);
     }     
  };

  return (
    <div>
      {apiInfo && (
        <ApiCreatePage
          apiInfo={apiInfo}
          onSubmitApi={onSubmitApi}
          loading={loading}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  api: state.api.apiRegistry,
});
const mapActionsToProps = {
  getApibyId, updateConfig
};

export default connect(mapStateToProps, mapActionsToProps)(ApiEditPage);

