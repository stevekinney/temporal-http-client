import createClient, { type ClientOptions } from 'openapi-fetch';
import type { components, paths } from './schema.js';

/**
 * The API client class encapsulating all methods for interacting with Temporal's HTTP API.
 */
export class Client {
  private client: ReturnType<typeof createClient<paths>>;
  private _options: ClientOptions;

  constructor(options: ClientOptions) {
    this._options = options;
    this.client = createClient(options);
  }

  /**
   * Generates a new client with an updated `baseUrl`.
   */
  set baseUrl(baseUrl: string) {
    this.client = createClient<paths>({ ...this._options, baseUrl });
  }

  /**
   * Gets the current options for the API client.
   */
  get options(): ClientOptions {
    return this._options;
  }

  /**
   * Sets new options for the API client.
   */
  set options(options: ClientOptions) {
    this._options = options;
    this.client = createClient({ ...this._options, ...options });
  }

  /** @description GetClusterInfo returns information about temporal cluster */
  getClusterInfo() {
    return this.client.GET('/api/v1/cluster-info');
  }

  /** @description ListNamespaces returns the information and configuration for all namespaces. */
  listNamespaces({
    query,
  }: {
    query?: {
      pageSize?: number;
      nextPageToken?: string;
      /**
       * @description By default namespaces in NAMESPACE_STATE_DELETED state are not included.
       *  Setting include_deleted to true will include deleted namespaces.
       *  Note: Namespace is in NAMESPACE_STATE_DELETED state when it was deleted from the system but associated data is not deleted yet.
       */
      'namespaceFilter.includeDeleted'?: boolean;
    };
  } = {}) {
    return this.client.GET('/api/v1/namespaces', { params: { query } });
  }

  /**
   * @description RegisterNamespace creates a new namespace which can be used as a container for all resources.
   *
   *  A Namespace is a top level entity within Temporal, and is used as a container for resources
   *  like workflow executions, task queues, etc. A Namespace acts as a sandbox and provides
   *  isolation for all resources within the namespace. All resources belongs to exactly one
   *  namespace.
   */
  registerNamespace({ body }: { body: components['schemas']['RegisterNamespaceRequest'] }) {
    return this.client.POST('/api/v1/namespaces', { body });
  }

  /** @description DescribeNamespace returns the information and configuration for a registered namespace. */
  describeNamespace({
    query,
    path,
  }: {
    query?: {
      id?: string;
    };
    path: {
      namespace: string;
    };
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}', { params: { query, path } });
  }

  /**
   * @description RespondActivityTaskFailed is called by workers when processing an activity task fails.
   *
   *  This results in a new `ACTIVITY_TASK_CANCELED` event being written to the workflow history
   *  and a new workflow task created for the workflow. Fails with `NotFound` if the task token is
   *  no longer valid due to activity timeout, already being completed, or never having existed.
   */
  respondActivityTaskCanceled({
    path,
    body,
  }: {
    path: {
      namespace: string;
    };
    body: components['schemas']['RespondActivityTaskCanceledRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/cancel', {
      params: { path },
      body,
    });
  }

  /**
   * @description See `RecordActivityTaskCanceled`. This version allows clients to record failures by
   *  namespace/workflow id/activity id instead of task token.
   *
   *  (-- api-linter: core::0136::prepositions=disabled
   *      aip.dev/not-precedent: "By" is used to indicate request type. --)
   */
  respondActivityTaskCanceledById({
    path,
    body,
  }: {
    path: {
      /** @description Namespace of the workflow which scheduled this activity */
      namespace: string;
    };
    body: components['schemas']['RespondActivityTaskCanceledByIdRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/cancel-by-id', {
      params: { path },
      body,
    });
  }

  /**
   * @description RespondActivityTaskCompleted is called by workers when they successfully complete an activity
   *  task.
   *
   *  This results in a new `ACTIVITY_TASK_COMPLETED` event being written to the workflow history
   *  and a new workflow task created for the workflow. Fails with `NotFound` if the task token is
   *  no longer valid due to activity timeout, already being completed, or never having existed.
   */
  respondActivityTaskCompleted({
    path,
    body,
  }: {
    path: {
      namespace: string;
    };
    body: components['schemas']['RespondActivityTaskCompletedRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/complete', {
      params: { path },
      body,
    });
  }

  /**
   * @description See `RecordActivityTaskCompleted`. This version allows clients to record completions by
   *  namespace/workflow id/activity id instead of task token.
   *
   *  (-- api-linter: core::0136::prepositions=disabled
   *      aip.dev/not-precedent: "By" is used to indicate request type. --)
   */
  respondActivityTaskCompletedById({
    path,
    body,
  }: {
    path: {
      /** @description Namespace of the workflow which scheduled this activity */
      namespace: string;
    };
    body: components['schemas']['RespondActivityTaskCompletedByIdRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/complete-by-id', {
      params: { path },
      body,
    });
  }

  /**
   * @description RespondActivityTaskFailed is called by workers when processing an activity task fails.
   *
   *  This results in a new `ACTIVITY_TASK_FAILED` event being written to the workflow history and
   *  a new workflow task created for the workflow. Fails with `NotFound` if the task token is no
   *  longer valid due to activity timeout, already being completed, or never having existed.
   */
  respondActivityTaskFailed({
    path,
    body,
  }: {
    path: {
      namespace: string;
    };
    body: components['schemas']['RespondActivityTaskFailedRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/fail', {
      params: { path },
      body,
    });
  }

  /**
   * @description See `RecordActivityTaskFailed`. This version allows clients to record failures by
   *  namespace/workflow id/activity id instead of task token.
   *
   *  (-- api-linter: core::0136::prepositions=disabled
   *      aip.dev/not-precedent: "By" is used to indicate request type. --)
   */
  respondActivityTaskFailedById({
    path,
    body,
  }: {
    path: {
      /** @description Namespace of the workflow which scheduled this activity */
      namespace: string;
    };
    body: components['schemas']['RespondActivityTaskFailedByIdRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/fail-by-id', {
      params: { path },
      body,
    });
  }

  /**
   * @description RecordActivityTaskHeartbeat is optionally called by workers while they execute activities.
   *
   *  If worker fails to heartbeat within the `heartbeat_timeout` interval for the activity task,
   *  then it will be marked as timed out and an `ACTIVITY_TASK_TIMED_OUT` event will be written to
   *  the workflow history. Calling `RecordActivityTaskHeartbeat` will fail with `NotFound` in
   *  such situations, in that event, the SDK should request cancellation of the activity.
   */
  recordActivityTaskHeartbeat({
    path,
    body,
  }: {
    path: {
      namespace: string;
    };
    body: components['schemas']['RecordActivityTaskHeartbeatRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/heartbeat', {
      params: { path },
      body,
    });
  }

  /**
   * @description See `RecordActivityTaskHeartbeat`. This version allows clients to record heartbeats by
   *  namespace/workflow id/activity id instead of task token.
   *
   *  (-- api-linter: core::0136::prepositions=disabled
   *      aip.dev/not-precedent: "By" is used to indicate request type. --)
   */
  recordActivityTaskHeartbeatById({
    path,
    body,
  }: {
    path: {
      /** @description Namespace of the workflow which scheduled this activity */
      namespace: string;
    };
    body: components['schemas']['RecordActivityTaskHeartbeatByIdRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/activities/heartbeat-by-id', {
      params: { path },
      body,
    });
  }

  /** @description ListArchivedWorkflowExecutions is a visibility API to list archived workflow executions in a specific namespace. */
  listArchivedWorkflowExecutions({
    query,
    path,
  }: {
    query?: {
      pageSize?: number;
      nextPageToken?: string;
      query?: string;
    };
    path: {
      namespace: string;
    };
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/archived-workflows', {
      params: { query, path },
    });
  }

  /** @description ListBatchOperations returns a list of batch operations */
  listBatchOperations({
    query,
    path,
  }: {
    query?: {
      /** @description List page size */
      pageSize?: number;
      /** @description Next page token */
      nextPageToken?: string;
    };
    path: {
      /** @description Namespace that contains the batch operation */
      namespace: string;
    };
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/batch-operations', {
      params: { query, path },
    });
  }

  /** @description DescribeBatchOperation returns the information about a batch operation */
  describeBatchOperation({
    path,
  }: {
    path: {
      /** @description Namespace that contains the batch operation */
      namespace: string;
      /** @description Batch job id */
      jobId: string;
    };
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/batch-operations/{jobId}', {
      params: { path },
    });
  }

  /** @description StartBatchOperation starts a new batch operation */
  startBatchOperation({
    path,
    body,
  }: {
    path: {
      /** @description Namespace that contains the batch operation */
      namespace: string;
      /** @description Job ID defines the unique ID for the batch job */
      jobId: string;
    };
    body: components['schemas']['StartBatchOperationRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/batch-operations/{jobId}', {
      params: { path },
      body,
    });
  }

  /** @description StopBatchOperation stops a batch operation */
  stopBatchOperation({
    path,
    body,
  }: {
    path: {
      /** @description Namespace that contains the batch operation */
      namespace: string;
      /** @description Batch job id */
      jobId: string;
    };
    body: components['schemas']['StopBatchOperationRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/batch-operations/{jobId}/stop', {
      params: { path },
      body,
    });
  }

  /** @description List all schedules in a namespace. */
  listSchedules({
    query,
    path,
  }: {
    query?: {
      /** @description How many to return at once. */
      maximumPageSize?: number;
      /** @description Token to get the next page of results. */
      nextPageToken?: string;
    };
    path: {
      /** @description The namespace to list schedules in. */
      namespace: string;
    };
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/schedules', { params: { query, path } });
  }

  /** @description Returns the schedule description and current state of an existing schedule. */
  describeSchedule({
    path,
  }: {
    path: {
      /** @description The namespace of the schedule to describe. */
      namespace: string;
      /** @description The id of the schedule to describe. */
      scheduleId: string;
    };
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/schedules/{scheduleId}', {
      params: { path },
    });
  }

  /** @description Creates a new schedule. */
  createSchedule({
    path,
    body,
  }: {
    path: {
      /** @description The namespace the schedule should be created in. */
      namespace: string;
      /** @description The id of the new schedule. */
      scheduleId: string;
    };
    body: components['schemas']['CreateScheduleRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/schedules/{scheduleId}', {
      params: { path },
      body,
    });
  }

  /** @description Deletes a schedule, removing it from the system. */
  deleteSchedule({
    query,
    path,
  }: {
    query?: {
      /** @description The identity of the client who initiated this request. */
      identity?: string;
    };
    path: {
      /** @description The namespace of the schedule to delete. */
      namespace: string;
      /** @description The id of the schedule to delete. */
      scheduleId: string;
    };
  }) {
    return this.client.DELETE('/api/v1/namespaces/{namespace}/schedules/{scheduleId}', {
      params: { query, path },
    });
  }

  /** @description Lists matching times within a range. */
  listScheduleMatchingTimes({
    query,
    path,
  }: {
    query?: {
      /** @description Time range to query. */
      startTime?: string;
      endTime?: string;
    };
    path: {
      /** @description The namespace of the schedule to query. */
      namespace: string;
      /** @description The id of the schedule to query. */
      scheduleId: string;
    };
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/schedules/{scheduleId}/matching-times', {
      params: { query, path },
    });
  }

  /** @description Makes a specific change to a schedule or triggers an immediate action. */
  patchSchedule({
    path,
    body,
  }: {
    path: {
      /** @description The namespace of the schedule to patch. */
      namespace: string;
      /** @description The id of the schedule to patch. */
      scheduleId: string;
    };
    body: components['schemas']['PatchScheduleRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/schedules/{scheduleId}/patch', {
      params: { path },
      body,
    });
  }

  /** @description Changes the configuration or state of an existing schedule. */
  updateSchedule({
    path,
    body,
  }: {
    path: {
      /** @description The namespace of the schedule to update. */
      namespace: string;
      /** @description The id of the schedule to update. */
      scheduleId: string;
    };
    body: components['schemas']['UpdateScheduleRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/schedules/{scheduleId}/update', {
      params: { path },
      body,
    });
  }

  /** @description ListSearchAttributes returns comprehensive information about search attributes. */
  listSearchAttributes({
    path,
  }: {
    path: {
      namespace: string;
    };
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/search-attributes', {
      params: { path },
    });
  }

  /** @description Fetches the worker build id versioning sets for a task queue. */
  getWorkerBuildIdCompatibility({
    query,
    path,
  }: {
    query?: {
      /**
       * @description Limits how many compatible sets will be returned. Specify 1 to only return the current
       *  default major version set. 0 returns all sets.
       */
      maxSets?: number;
    };
    path: {
      namespace: string;
      /** @description Must be set, the task queue to interrogate about worker id compatibility. */
      taskQueue: string;
    };
  }) {
    return this.client.GET(
      '/api/v1/namespaces/{namespace}/task-queues/{taskQueue}/worker-build-id-compatibility',
      { params: { query, path } },
    );
  }

  /** @description DescribeTaskQueue returns information about the target task queue. */
  describeTaskQueue({
    query,
    path,
  }: {
    query?: {
      'taskQueue.name'?: string;
      /** @description Default: TASK_QUEUE_KIND_NORMAL. */
      'taskQueue.kind'?:
        | 'TASK_QUEUE_KIND_UNSPECIFIED'
        | 'TASK_QUEUE_KIND_NORMAL'
        | 'TASK_QUEUE_KIND_STICKY';
      /**
       * @description Iff kind == TASK_QUEUE_KIND_STICKY, then this field contains the name of
       *  the normal task queue that the sticky worker is running on.
       */
      'taskQueue.normalName'?: string;
      /** @description If unspecified (TASK_QUEUE_TYPE_UNSPECIFIED), then default value (TASK_QUEUE_TYPE_WORKFLOW) will be used. */
      taskQueueType?:
        | 'TASK_QUEUE_TYPE_UNSPECIFIED'
        | 'TASK_QUEUE_TYPE_WORKFLOW'
        | 'TASK_QUEUE_TYPE_ACTIVITY'
        | 'TASK_QUEUE_TYPE_NEXUS';
      includeTaskQueueStatus?: boolean;
    };
    path: {
      namespace: string;
      'task_queue.name': string;
    };
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/task-queues/{task_queue.name}', {
      params: { query, path },
    });
  }

  /**
   * @description UpdateNamespace is used to update the information and configuration of a registered
   *  namespace.
   */
  updateNamespace({
    path,
    body,
  }: {
    path: {
      namespace: string;
    };
    body: components['schemas']['UpdateNamespaceRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/update', { params: { path }, body });
  }

  /**
   * @description Fetches task reachability to determine whether a worker may be retired.
   *  The request may specify task queues to query for or let the server fetch all task queues mapped to the given
   *  build IDs.
   *
   *  When requesting a large number of task queues or all task queues associated with the given build ids in a
   *  namespace, all task queues will be listed in the response but some of them may not contain reachability
   *  information due to a server enforced limit. When reaching the limit, task queues that reachability information
   *  could not be retrieved for will be marked with a single TASK_REACHABILITY_UNSPECIFIED entry. The caller may issue
   *  another call to get the reachability for those task queues.
   *
   *  Open source users can adjust this limit by setting the server's dynamic config value for
   *  `limit.reachabilityTaskQueueScan` with the caveat that this call can strain the visibility store.
   */
  getWorkerTaskReachability({
    query,
    path,
  }: {
    query?: {
      /**
       * @description Build ids to retrieve reachability for. An empty string will be interpreted as an unversioned worker.
       *  The number of build ids that can be queried in a single API call is limited.
       *  Open source users can adjust this limit by setting the server's dynamic config value for
       *  `limit.reachabilityQueryBuildIds` with the caveat that this call can strain the visibility store.
       */
      buildIds?: string[];
      /**
       * @description Task queues to retrieve reachability for. Leave this empty to query for all task queues associated with given
       *  build ids in the namespace.
       *  Must specify at least one task queue if querying for an unversioned worker.
       *  The number of task queues that the server will fetch reachability information for is limited.
       *  See the `GetWorkerTaskReachabilityResponse` documentation for more information.
       */
      taskQueues?: string[];
      /**
       * @description Type of reachability to query for.
       *  `TASK_REACHABILITY_NEW_WORKFLOWS` is always returned in the response.
       *  Use `TASK_REACHABILITY_EXISTING_WORKFLOWS` if your application needs to respond to queries on closed workflows.
       *  Otherwise, use `TASK_REACHABILITY_OPEN_WORKFLOWS`. Default is `TASK_REACHABILITY_EXISTING_WORKFLOWS` if left
       *  unspecified.
       *  See the TaskReachability docstring for information about each enum variant.
       */
      reachability?:
        | 'TASK_REACHABILITY_UNSPECIFIED'
        | 'TASK_REACHABILITY_NEW_WORKFLOWS'
        | 'TASK_REACHABILITY_EXISTING_WORKFLOWS'
        | 'TASK_REACHABILITY_OPEN_WORKFLOWS'
        | 'TASK_REACHABILITY_CLOSED_WORKFLOWS';
    };
    path: {
      namespace: string;
    };
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/worker-task-reachability', {
      params: { query, path },
    });
  }

  /** @description CountWorkflowExecutions is a visibility API to count of workflow executions in a specific namespace. */
  countWorkflowExecutions({
    query,
    path,
  }: {
    query?: {
      query?: string;
    };
    path: {
      namespace: string;
    };
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/workflow-count', {
      params: { query, path },
    });
  }

  /** @description ListWorkflowExecutions is a visibility API to list workflow executions in a specific namespace. */
  listWorkflowExecutions({
    query,
    path,
  }: {
    query?: {
      pageSize?: number;
      nextPageToken?: string;
      query?: string;
    };
    path: {
      namespace: string;
    };
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/workflows', { params: { query, path } });
  }

  /** @description DescribeWorkflowExecution returns information about the specified workflow execution. */
  describeWorkflowExecution({
    query,
    path,
  }: {
    query?: {
      'execution.workflowId'?: string;
      'execution.runId'?: string;
    };
    path: {
      namespace: string;
      'execution.workflow_id': string;
    };
  }) {
    return this.client.GET('/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}', {
      params: { query, path },
    });
  }

  /**
   * @description GetWorkflowExecutionHistory returns the history of specified workflow execution. Fails with
   *  `NotFound` if the specified workflow execution is unknown to the service.
   */
  getWorkflowExecutionHistory({
    query,
    path,
  }: {
    query?: {
      'execution.workflowId'?: string;
      'execution.runId'?: string;
      maximumPageSize?: number;
      /**
       * @description If a `GetWorkflowExecutionHistoryResponse` or a `PollWorkflowTaskQueueResponse` had one of
       *  these, it should be passed here to fetch the next page.
       */
      nextPageToken?: string;
      /**
       * @description If set to true, the RPC call will not resolve until there is a new event which matches
       *  the `history_event_filter_type`, or a timeout is hit.
       */
      waitNewEvent?: boolean;
      /**
       * @description Filter returned events such that they match the specified filter type.
       *  Default: HISTORY_EVENT_FILTER_TYPE_ALL_EVENT.
       */
      historyEventFilterType?:
        | 'HISTORY_EVENT_FILTER_TYPE_UNSPECIFIED'
        | 'HISTORY_EVENT_FILTER_TYPE_ALL_EVENT'
        | 'HISTORY_EVENT_FILTER_TYPE_CLOSE_EVENT';
      skipArchival?: boolean;
    };
    path: {
      namespace: string;
      'execution.workflow_id': string;
    };
  }) {
    return this.client.GET(
      '/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}/history',
      { params: { query, path } },
    );
  }

  /**
   * @description GetWorkflowExecutionHistoryReverse returns the history of specified workflow execution in reverse
   *  order (starting from last event). Fails with`NotFound` if the specified workflow execution is
   *  unknown to the service.
   */
  getWorkflowExecutionHistoryReverse({
    query,
    path,
  }: {
    query?: {
      'execution.workflowId'?: string;
      'execution.runId'?: string;
      maximumPageSize?: number;
      nextPageToken?: string;
    };
    path: {
      namespace: string;
      'execution.workflow_id': string;
    };
  }) {
    return this.client.GET(
      '/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}/history-reverse',
      { params: { query, path } },
    );
  }

  /** @description QueryWorkflow requests a query be executed for a specified workflow execution. */
  queryWorkflow({
    path,
    body,
  }: {
    path: {
      namespace: string;
      'execution.workflow_id': string;
      'query.query_type': string;
    };
    body: components['schemas']['QueryWorkflowRequest'];
  }) {
    return this.client.POST(
      '/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}/query/{query.query_type}',
      { params: { path }, body },
    );
  }

  /**
   * @description StartWorkflowExecution starts a new workflow execution.
   *
   *  It will create the execution with a `WORKFLOW_EXECUTION_STARTED` event in its history and
   *  also schedule the first workflow task. Returns `WorkflowExecutionAlreadyStarted`, if an
   *  instance already exists with same workflow id.
   */
  startWorkflowExecution({
    path,
    body,
  }: {
    path: {
      namespace: string;
      workflowId: string;
    };
    body: components['schemas']['StartWorkflowExecutionRequest'];
  }) {
    return this.client.POST('/api/v1/namespaces/{namespace}/workflows/{workflowId}', {
      params: { path },
      body,
    });
  }

  /**
   * @description SignalWithStartWorkflowExecution is used to ensure a signal is sent to a workflow, even if
   *  it isn't yet started.
   *
   *  If the workflow is running, a `WORKFLOW_EXECUTION_SIGNALED` event is recorded in the history
   *  and a workflow task is generated.
   *
   *  If the workflow is not running or not found, then the workflow is created with
   *  `WORKFLOW_EXECUTION_STARTED` and `WORKFLOW_EXECUTION_SIGNALED` events in its history, and a
   *  workflow task is generated.
   *
   *  (-- api-linter: core::0136::prepositions=disabled
   *      aip.dev/not-precedent: "With" is used to indicate combined operation. --)
   */
  signalWithStartWorkflowExecution({
    path,
    body,
  }: {
    path: {
      namespace: string;
      workflowId: string;
      /** @description The workflow author-defined name of the signal to send to the workflow */
      signalName: string;
    };
    body: components['schemas']['SignalWithStartWorkflowExecutionRequest'];
  }) {
    return this.client.POST(
      '/api/v1/namespaces/{namespace}/workflows/{workflowId}/signal-with-start/{signalName}',
      { params: { path }, body },
    );
  }

  /**
   * @description RequestCancelWorkflowExecution is called by workers when they want to request cancellation of
   *  a workflow execution.
   *
   *  This results in a new `WORKFLOW_EXECUTION_CANCEL_REQUESTED` event being written to the
   *  workflow history and a new workflow task created for the workflow. It returns success if the requested
   *  workflow is already closed. It fails with 'NotFound' if the requested workflow doesn't exist.
   */
  requestCancelWorkflowExecution({
    path,
    body,
  }: {
    path: {
      namespace: string;
      'workflow_execution.workflow_id': string;
    };
    body: components['schemas']['RequestCancelWorkflowExecutionRequest'];
  }) {
    return this.client.POST(
      '/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/cancel',
      { params: { path }, body },
    );
  }

  /**
   * @description ResetWorkflowExecution will reset an existing workflow execution to a specified
   *  `WORKFLOW_TASK_COMPLETED` event (exclusive). It will immediately terminate the current
   *  execution instance.
   *  TODO: Does exclusive here mean *just* the completed event, or also WFT started? Otherwise the task is doomed to time out?
   */
  resetWorkflowExecution({
    path,
    body,
  }: {
    path: {
      namespace: string;
      'workflow_execution.workflow_id': string;
    };
    body: components['schemas']['ResetWorkflowExecutionRequest'];
  }) {
    return this.client.POST(
      '/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/reset',
      { params: { path }, body },
    );
  }

  /**
   * @description SignalWorkflowExecution is used to send a signal to a running workflow execution.
   *
   *  This results in a `WORKFLOW_EXECUTION_SIGNALED` event recorded in the history and a workflow
   *  task being created for the execution.
   */
  signalWorkflowExecution({
    path,
    body,
  }: {
    path: {
      namespace: string;
      'workflow_execution.workflow_id': string;
      /** @description The workflow author-defined name of the signal to send to the workflow */
      signalName: string;
    };
    body: components['schemas']['SignalWorkflowExecutionRequest'];
  }) {
    return this.client.POST(
      '/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/signal/{signalName}',
      { params: { path }, body },
    );
  }

  /**
   * @description TerminateWorkflowExecution terminates an existing workflow execution by recording a
   *  `WORKFLOW_EXECUTION_TERMINATED` event in the history and immediately terminating the
   *  execution instance.
   */
  terminateWorkflowExecution({
    path,
    body,
  }: {
    path: {
      namespace: string;
      'workflow_execution.workflow_id': string;
    };
    body: components['schemas']['TerminateWorkflowExecutionRequest'];
  }) {
    return this.client.POST(
      '/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/terminate',
      { params: { path }, body },
    );
  }

  /** @description Invokes the specified update function on user workflow code. */
  updateWorkflowExecution({
    path,
    body,
  }: {
    path: {
      /** @description The namespace name of the target workflow */
      namespace: string;
      'workflow_execution.workflow_id': string;
      'request.input.name': string;
    };
    body: components['schemas']['UpdateWorkflowExecutionRequest'];
  }) {
    return this.client.POST(
      '/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/update/{request.input.name}',
      { params: { path }, body },
    );
  }

  /** @description GetSystemInfo returns information about the system. */
  getSystemInfo() {
    return this.client.GET('/api/v1/system-info');
  }
}
