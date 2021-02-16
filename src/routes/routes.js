import $ from "jquery";
import React from "react";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

// const DashboardDefault = React.lazy(() => import('../Demo/Dashboard/Default'));

const UIBasicButton = React.lazy(() =>
  import("../Demo/UIElements/Basic/Button")
);
const UIBasicBadges = React.lazy(() =>
  import("../Demo/UIElements/Basic/Badges")
);
const UIBasicBreadcrumbPagination = React.lazy(() =>
  import("../Demo/UIElements/Basic/BreadcrumbPagination")
);

const UIBasicCollapse = React.lazy(() =>
  import("../Demo/UIElements/Basic/Collapse")
);
const UIBasicTabsPills = React.lazy(() =>
  import("../Demo/UIElements/Basic/TabsPills")
);
const UIBasicBasicTypography = React.lazy(() =>
  import("../Demo/UIElements/Basic/Typography")
);

const FormsElements = React.lazy(() => import("../Demo/Forms/FormsElements"));

const BootstrapTable = React.lazy(() =>
  import("../Demo/Tables/BootstrapTable")
);

const Nvd3Chart = React.lazy(() => import("../Demo/Charts/Nvd3Chart/index"));

const GoogleMap = React.lazy(() => import("../Demo/Maps/GoogleMap/index"));

const OtherSamplePage = React.lazy(() => import("../Demo/Other/SamplePage"));
const OtherDocs = React.lazy(() => import("../Demo/Other/Docs"));

const EventRegistry = React.lazy(() =>
  import("../app/views/event-registry/EventRegistryPage")
);

const ApiRegistry = React.lazy(() => import("../app/views/apis/ApisPage"));

const routes = [
  {
    path: "/events",
    exact: true,
    name: "Events",
    component: EventRegistry,
  },
  {
    path: "/events/new",
    exact: true,
    name: "Events",
    component: EventRegistry,
  },
  {
    path: "/events/edit/:id",
    exact: true,
    name: "Events",
    component: EventRegistry,
  },
  {
    path: "/apis",
    exact: true,
    name: "Apis",
    component: ApiRegistry,
  },
  {
    path: "/apis/new",
    exact: true,
    name: "Apis",
    component: ApiRegistry,
  },
  {
    path: "/apis/edit/:id",
    exact: true,
    name: "Apis",
    component: ApiRegistry,
  },
  {
    path: "/apis/:id/joiners",
    exact: true,
    name: "Apis",
    component: ApiRegistry,
  },
  {
    path: "/apis/:id/splitters",
    exact: true,
    name: "Apis",
    component: ApiRegistry,
  },
  // { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
  {
    path: "/basic/button",
    exact: false,
    name: "Basic Button",
    component: UIBasicButton,
  },
  {
    path: "/basic/badges",
    exact: false,
    name: "Basic Badges",
    component: UIBasicBadges,
  },
  {
    path: "/basic/breadcrumb-paging",
    exact: false,
    name: "Basic Breadcrumb Pagination",
    component: UIBasicBreadcrumbPagination,
  },
  {
    path: "/basic/collapse",
    exact: false,
    name: "Basic Collapse",
    component: UIBasicCollapse,
  },
  {
    path: "/basic/tabs-pills",
    exact: false,
    name: "Basic Tabs & Pills",
    component: UIBasicTabsPills,
  },
  {
    path: "/basic/typography",
    exact: false,
    name: "Basic Typography",
    component: UIBasicBasicTypography,
  },
  {
    path: "/forms/form-basic",
    exact: false,
    name: "Forms Elements",
    component: FormsElements,
  },
  {
    path: "/tables/bootstrap",
    exact: false,
    name: "Bootstrap Table",
    component: BootstrapTable,
  },
  {
    path: "/charts/nvd3",
    exact: false,
    name: "Nvd3 Chart",
    component: Nvd3Chart,
  },
  {
    path: "/maps/google-map",
    exact: false,
    name: "Google Map",
    component: GoogleMap,
  },
  {
    path: "/sample-page",
    exact: false,
    name: "Sample Page",
    component: OtherSamplePage,
  },
  { path: "/docs", exact: false, name: "Documentation", component: OtherDocs },
];

export default routes;
