import createClient, { type ClientOptions } from 'openapi-fetch';
import type { components, operations, paths } from './schema.js';

export class Client {
  private client: ReturnType<typeof createClient<paths>>;
  private _options: ClientOptions;

  constructor(options: ClientOptions) {
    this._options = options;
    this.client = createClient<paths>(options);
  }

  set baseUrl(baseUrl: string) {
    this.client = createClient<paths>({ ...this.options, baseUrl });
  }

  get options() {
    return this._options;
  }

  set options(options: ClientOptions) {
    this.client = createClient<paths>({ ...this.options, ...options });
  }

  getClusterInfo() {
    return this.client.GET('/api/v1/cluster-info');
  }

  listNamespaces({ query }: { query?: operations['ListNamespaces']['parameters']['query'] } = {}) {
    return this.client.GET('/api/v1/namespaces', { params: { query } });
  }

  registerNamespace({ body }: { body: components['schemas']['RegisterNamespaceRequest'] }) {
    return this.client.POST('/api/v1/namespaces', { body });
  }

  describeNamespace({
    query,
    path,
  }: {
    query?: operations['DescribeNamespace']['parameters']['query'];
    path: operations['DescribeNamespace']['parameters']['path'];
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}', { params: { query, path } });
  }

  respondActivityTaskCanceled({
    path,
    body,
  }: {
    path: operations['RespondActivityTaskCanceled']['parameters']['path'];
    body: components['schemas']['RespondActivityTaskCanceledRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/cancel', {
      params: { path },
      body,
    });
  }

  respondActivityTaskCanceledById({
    path,
    body,
  }: {
    path: operations['RespondActivityTaskCanceledById']['parameters']['path'];
    body: components['schemas']['RespondActivityTaskCanceledByIdRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/cancel-by-id', {
      params: { path },
      body,
    });
  }

  respondActivityTaskCompleted({
    path,
    body,
  }: {
    path: operations['RespondActivityTaskCompleted']['parameters']['path'];
    body: components['schemas']['RespondActivityTaskCompletedRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/complete', {
      params: { path },
      body,
    });
  }

  respondActivityTaskCompletedById({
    path,
    body,
  }: {
    path: operations['RespondActivityTaskCompletedById']['parameters']['path'];
    body: components['schemas']['RespondActivityTaskCompletedByIdRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/complete-by-id', {
      params: { path },
      body,
    });
  }

  respondActivityTaskFailed({
    path,
    body,
  }: {
    path: operations['RespondActivityTaskFailed']['parameters']['path'];
    body: components['schemas']['RespondActivityTaskFailedRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/fail', {
      params: { path },
      body,
    });
  }

  respondActivityTaskFailedById({
    path,
    body,
  }: {
    path: operations['RespondActivityTaskFailedById']['parameters']['path'];
    body: components['schemas']['RespondActivityTaskFailedByIdRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/fail-by-id', {
      params: { path },
      body,
    });
  }

  recordActivityTaskHeartbeat({
    path,
    body,
  }: {
    path: operations['RecordActivityTaskHeartbeat']['parameters']['path'];
    body: components['schemas']['RecordActivityTaskHeartbeatRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/heartbeat', {
      params: { path },
      body,
    });
  }

  recordActivityTaskHeartbeatById({
    path,
    body,
  }: {
    path: operations['RecordActivityTaskHeartbeatById']['parameters']['path'];
    body: components['schemas']['RecordActivityTaskHeartbeatByIdRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/heartbeat-by-id', {
      params: { path },
      body,
    });
  }

  listArchivedWorkflowExecutions({
    query,
    path,
  }: {
    query?: operations['ListArchivedWorkflowExecutions']['parameters']['query'];
    path: operations['ListArchivedWorkflowExecutions']['parameters']['path'];
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/archived-workflows', {
      params: { query, path },
    });
  }

  listBatchOperations({
    query,
    path,
  }: {
    query?: operations['ListBatchOperations']['parameters']['query'];
    path: operations['ListBatchOperations']['parameters']['path'];
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/batch-operations', {
      params: { query, path },
    });
  }

  describeBatchOperation({
    path,
  }: {
    path: operations['DescribeBatchOperation']['parameters']['path'];
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/batch-operations/{jobId}', {
      params: { path },
    });
  }

  startBatchOperation({
    path,
    body,
  }: {
    path: operations['StartBatchOperation']['parameters']['path'];
    body: components['schemas']['StartBatchOperationRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/batch-operations/{jobId}', {
      params: { path },
      body,
    });
  }

  stopBatchOperation({
    path,
    body,
  }: {
    path: operations['StopBatchOperation']['parameters']['path'];
    body: components['schemas']['StopBatchOperationRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/batch-operations/{jobId}/stop', {
      params: { path },
      body,
    });
  }

  listSchedules({
    query,
    path,
  }: {
    query?: operations['ListSchedules']['parameters']['query'];
    path: operations['ListSchedules']['parameters']['path'];
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/schedules', { params: { query, path } });
  }

  describeSchedule({ path }: { path: operations['DescribeSchedule']['parameters']['path'] }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/schedules/{scheduleId}', {
      params: { path },
    });
  }

  createSchedule({
    path,
    body,
  }: {
    path: operations['CreateSchedule']['parameters']['path'];
    body: components['schemas']['CreateScheduleRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/schedules/{scheduleId}', {
      params: { path },
      body,
    });
  }

  deleteSchedule({
    query,
    path,
  }: {
    query?: operations['DeleteSchedule']['parameters']['query'];
    path: operations['DeleteSchedule']['parameters']['path'];
  }) {
    return this.client.DELETE('/api/v1/namespaces/{namespace}/schedules/{scheduleId}', {
      params: { query, path },
    });
  }

  listScheduleMatchingTimes({
    query,
    path,
  }: {
    query?: operations['ListScheduleMatchingTimes']['parameters']['query'];
    path: operations['ListScheduleMatchingTimes']['parameters']['path'];
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/schedules/{scheduleId}/matching-times', {
      params: { query, path },
    });
  }

  patchSchedule({
    path,
    body,
  }: {
    path: operations['PatchSchedule']['parameters']['path'];
    body: components['schemas']['PatchScheduleRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/schedules/{scheduleId}/patch', {
      params: { path },
      body,
    });
  }

  updateSchedule({
    path,
    body,
  }: {
    path: operations['UpdateSchedule']['parameters']['path'];
    body: components['schemas']['UpdateScheduleRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/schedules/{scheduleId}/update', {
      params: { path },
      body,
    });
  }

  listSearchAttributes({
    path,
  }: {
    path: operations['ListSearchAttributes']['parameters']['path'];
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/search-attributes', {
      params: { path },
    });
  }

  getWorkerBuildIdCompatibility({
    query,
    path,
  }: {
    query?: operations['GetWorkerBuildIdCompatibility']['parameters']['query'];
    path: operations['GetWorkerBuildIdCompatibility']['parameters']['path'];
  }) {
    return this.client.GET(
      '/api/v1/namespaces/{namespace}/task-queues/{taskQueue}/worker-build-id-compatibility',
      { params: { query, path } },
    );
  }

  describeTaskQueue({
    query,
    path,
  }: {
    query?: operations['DescribeTaskQueue']['parameters']['query'];
    path: operations['DescribeTaskQueue']['parameters']['path'];
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/task-queues/{task_queue.name}', {
      params: { query, path },
    });
  }

  updateNamespace({
    path,
    body,
  }: {
    path: operations['UpdateNamespace']['parameters']['path'];
    body: components['schemas']['UpdateNamespaceRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/update', { params: { path }, body });
  }

  getWorkerTaskReachability({
    query,
    path,
  }: {
    query?: operations['GetWorkerTaskReachability']['parameters']['query'];
    path: operations['GetWorkerTaskReachability']['parameters']['path'];
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/worker-task-reachability', {
      params: { query, path },
    });
  }

  countWorkflowExecutions({
    query,
    path,
  }: {
    query?: operations['CountWorkflowExecutions']['parameters']['query'];
    path: operations['CountWorkflowExecutions']['parameters']['path'];
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/workflow-count', {
      params: { query, path },
    });
  }

  listWorkflowExecutions({
    query,
    path,
  }: {
    query?: operations['ListWorkflowExecutions']['parameters']['query'];
    path: operations['ListWorkflowExecutions']['parameters']['path'];
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/workflows', { params: { query, path } });
  }

  describeWorkflowExecution({
    query,
    path,
  }: {
    query?: operations['DescribeWorkflowExecution']['parameters']['query'];
    path: operations['DescribeWorkflowExecution']['parameters']['path'];
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}', {
      params: { query, path },
    });
  }

  getWorkflowExecutionHistory({
    query,
    path,
  }: {
    query?: operations['GetWorkflowExecutionHistory']['parameters']['query'];
    path: operations['GetWorkflowExecutionHistory']['parameters']['path'];
  }) {
    return this.client.GET(
      '/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}/history',
      { params: { query, path } },
    );
  }

  getWorkflowExecutionHistoryReverse({
    query,
    path,
  }: {
    query?: operations['GetWorkflowExecutionHistoryReverse']['parameters']['query'];
    path: operations['GetWorkflowExecutionHistoryReverse']['parameters']['path'];
  }) {
    return this.client.GET(
      '/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}/history-reverse',
      { params: { query, path } },
    );
  }

  queryWorkflow({
    path,
    body,
  }: {
    path: operations['QueryWorkflow']['parameters']['path'];
    body: components['schemas']['QueryWorkflowRequest'];
  }) {
    return this.client.POST(
      '/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}/query/{query.query_type}',
      { params: { path }, body },
    );
  }

  startWorkflowExecution({
    path,
    body,
  }: {
    path: operations['StartWorkflowExecution']['parameters']['path'];
    body: components['schemas']['StartWorkflowExecutionRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/workflows/{workflowId}', {
      params: { path },
      body,
    });
  }

  signalWithStartWorkflowExecution({
    path,
    body,
  }: {
    path: operations['SignalWithStartWorkflowExecution']['parameters']['path'];
    body: components['schemas']['SignalWithStartWorkflowExecutionRequest'];
  }) {
    return this.client.POST(
      '/api/v1/namespaces/{namespace}/workflows/{workflowId}/signal-with-start/{signalName}',
      { params: { path }, body },
    );
  }

  requestCancelWorkflowExecution({
    path,
    body,
  }: {
    path: operations['RequestCancelWorkflowExecution']['parameters']['path'];
    body: components['schemas']['RequestCancelWorkflowExecutionRequest'];
  }) {
    return this.client.POST(
      '/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/cancel',
      { params: { path }, body },
    );
  }

  resetWorkflowExecution({
    path,
    body,
  }: {
    path: operations['ResetWorkflowExecution']['parameters']['path'];
    body: components['schemas']['ResetWorkflowExecutionRequest'];
  }) {
    return this.client.POST(
      '/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/reset',
      { params: { path }, body },
    );
  }

  signalWorkflowExecution({
    path,
    body,
  }: {
    path: operations['SignalWorkflowExecution']['parameters']['path'];
    body: components['schemas']['SignalWorkflowExecutionRequest'];
  }) {
    return this.client.POST(
      '/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/signal/{signalName}',
      { params: { path }, body },
    );
  }

  terminateWorkflowExecution({
    path,
    body,
  }: {
    path: operations['TerminateWorkflowExecution']['parameters']['path'];
    body: components['schemas']['TerminateWorkflowExecutionRequest'];
  }) {
    return this.client.POST(
      '/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/terminate',
      { params: { path }, body },
    );
  }

  updateWorkflowExecution({
    path,
    body,
  }: {
    path: operations['UpdateWorkflowExecution']['parameters']['path'];
    body: components['schemas']['UpdateWorkflowExecutionRequest'];
  }) {
    return this.client.POST(
      '/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/update/{request.input.name}',
      { params: { path }, body },
    );
  }

  getSystemInfo() {
    return this.client.GET('/api/v1/system-info');
  }
}
