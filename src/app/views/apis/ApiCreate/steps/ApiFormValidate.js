export const apiValidate = (values, isApiUnique) => {
  const errors = {};
  // console.log('values', values, isApiUnique);
  if (!values.apiName) {
    errors.apiName = 'Api Name is required';
  } else if(!values.apiName.match(/^[0-9a-zA-Z]+$/)) {
    errors.apiName = 'Only alphabets and number allowed';
  }
 
  if (!values.apiVersion) {
    errors.apiVersion = 'Api Version is required';
  }else if(!values.apiVersion.match(/^[0-9a-zA-Z]+$/)) {
    errors.apiVersion = 'Only alphabets and number allowed';
  }

  if(!isApiUnique) {
    errors.apiName = 'Api and version already exists';
    errors.apiVersion = 'Api and version already exists';
  }

  if (!values.apiPath) {
    errors.apiPath = 'Api Path is required';
  }

  if (!values.gitUrl) {
    errors.gitUrl = 'Git Url is required';
  }
  if (!values.gitToken) {
    errors.gitToken = 'Git Token is required';
  }
  if (!values.apiCollection) {
    errors.apiCollection = 'Api Collection is required';
  }
  if (!values.apiSubCollection) {
    errors.apiSubCollection = 'Sub Collection is required';
  }
  if (!values.tags) {
    errors.tags = 'Search Tags is required';
  }
  console.log("errors", errors);
  return errors;
};
