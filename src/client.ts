import createClient, { type ClientOptions } from 'openapi-fetch';

import type { components, operations, paths } from './schema.js';

export class Client {
	client: ReturnType<typeof createClient<paths>>;

	constructor(options: ClientOptions) {
		this.client = createClient<paths>(options);
	}

	getClusterInfo() {
		return this.client.GET('/api/v1/cluster-info');
	}

	listNamespaces(params: operations['ListNamespaces']['parameters']) {
		return this.client.GET('/api/v1/namespaces', { params });
	}

	registerNamespace(body: components['schemas']['RegisterNamespaceRequest']) {
		return this.client.POST('/api/v1/namespaces', { body });
	}

	describeNamespace(params: operations['DescribeNamespace']['parameters']) {
		return this.client.GET('/api/v1/namespaces/{namespace}', { params });
	}

	respondActivityTaskCanceled(
		params: operations['RespondActivityTaskCanceled']['parameters'],
		body: components['schemas']['RespondActivityTaskCanceledRequest']
	) {
		return this.client.POST('/api/v1/namespaces/{namespace}/activities/cancel', { params, body });
	}

	respondActivityTaskCanceledById(
		params: operations['RespondActivityTaskCanceledById']['parameters'],
		body: components['schemas']['RespondActivityTaskCanceledByIdRequest']
	) {
		return this.client.POST('/api/v1/namespaces/{namespace}/activities/cancel-by-id', {
			params,
			body
		});
	}

	respondActivityTaskCompleted(
		params: operations['RespondActivityTaskCompleted']['parameters'],
		body: components['schemas']['RespondActivityTaskCompletedRequest']
	) {
		return this.client.POST('/api/v1/namespaces/{namespace}/activities/complete', { params, body });
	}

	respondActivityTaskCompletedById(
		params: operations['RespondActivityTaskCompletedById']['parameters'],
		body: components['schemas']['RespondActivityTaskCompletedByIdRequest']
	) {
		return this.client.POST('/api/v1/namespaces/{namespace}/activities/complete-by-id', {
			params,
			body
		});
	}

	respondActivityTaskFailed(
		params: operations['RespondActivityTaskFailed']['parameters'],
		body: components['schemas']['RespondActivityTaskFailedRequest']
	) {
		return this.client.POST('/api/v1/namespaces/{namespace}/activities/fail', { params, body });
	}

	respondActivityTaskFailedById(
		params: operations['RespondActivityTaskFailedById']['parameters'],
		body: components['schemas']['RespondActivityTaskFailedByIdRequest']
	) {
		return this.client.POST('/api/v1/namespaces/{namespace}/activities/fail-by-id', {
			params,
			body
		});
	}

	recordActivityTaskHeartbeat(
		params: operations['RecordActivityTaskHeartbeat']['parameters'],
		body: components['schemas']['RecordActivityTaskHeartbeatRequest']
	) {
		return this.client.POST('/api/v1/namespaces/{namespace}/activities/heartbeat', {
			params,
			body
		});
	}

	recordActivityTaskHeartbeatById(
		params: operations['RecordActivityTaskHeartbeatById']['parameters'],
		body: components['schemas']['RecordActivityTaskHeartbeatByIdRequest']
	) {
		return this.client.POST('/api/v1/namespaces/{namespace}/activities/heartbeat-by-id', {
			params,
			body
		});
	}

	listArchivedWorkflowExecutions(
		params: operations['ListArchivedWorkflowExecutions']['parameters']
	) {
		return this.client.GET('/api/v1/namespaces/{namespace}/archived-workflows', { params });
	}

	listBatchOperations(params: operations['ListBatchOperations']['parameters']) {
		return this.client.GET('/api/v1/namespaces/{namespace}/batch-operations', { params });
	}

	describeBatchOperation(params: operations['DescribeBatchOperation']['parameters']) {
		return this.client.GET('/api/v1/namespaces/{namespace}/batch-operations/{jobId}', { params });
	}

	startBatchOperation(
		params: operations['StartBatchOperation']['parameters'],
		body: components['schemas']['StartBatchOperationRequest']
	) {
		return this.client.POST('/api/v1/namespaces/{namespace}/batch-operations/{jobId}', {
			params,
			body
		});
	}

	stopBatchOperation(
		params: operations['StopBatchOperation']['parameters'],
		body: components['schemas']['StopBatchOperationRequest']
	) {
		return this.client.POST('/api/v1/namespaces/{namespace}/batch-operations/{jobId}/stop', {
			params,
			body
		});
	}

	listSchedules(params: operations['ListSchedules']['parameters']) {
		return this.client.GET('/api/v1/namespaces/{namespace}/schedules', { params });
	}

	describeSchedule(params: operations['DescribeSchedule']['parameters']) {
		return this.client.GET('/api/v1/namespaces/{namespace}/schedules/{scheduleId}', { params });
	}

	createSchedule(
		params: operations['CreateSchedule']['parameters'],
		body: components['schemas']['CreateScheduleRequest']
	) {
		return this.client.POST('/api/v1/namespaces/{namespace}/schedules/{scheduleId}', {
			params,
			body
		});
	}

	deleteSchedule(params: operations['DeleteSchedule']['parameters']) {
		return this.client.DELETE('/api/v1/namespaces/{namespace}/schedules/{scheduleId}', { params });
	}

	listScheduleMatchingTimes(params: operations['ListScheduleMatchingTimes']['parameters']) {
		return this.client.GET('/api/v1/namespaces/{namespace}/schedules/{scheduleId}/matching-times', {
			params
		});
	}

	patchSchedule(
		params: operations['PatchSchedule']['parameters'],
		body: components['schemas']['PatchScheduleRequest']
	) {
		return this.client.POST('/api/v1/namespaces/{namespace}/schedules/{scheduleId}/patch', {
			params,
			body
		});
	}

	updateSchedule(
		params: operations['UpdateSchedule']['parameters'],
		body: components['schemas']['UpdateScheduleRequest']
	) {
		return this.client.POST('/api/v1/namespaces/{namespace}/schedules/{scheduleId}/update', {
			params,
			body
		});
	}

	listSearchAttributes(params: operations['ListSearchAttributes']['parameters']) {
		return this.client.GET('/api/v1/namespaces/{namespace}/search-attributes', { params });
	}

	getWorkerBuildIdCompatibility(params: operations['GetWorkerBuildIdCompatibility']['parameters']) {
		return this.client.GET(
			'/api/v1/namespaces/{namespace}/task-queues/{taskQueue}/worker-build-id-compatibility',
			{ params }
		);
	}

	describeTaskQueue(params: operations['DescribeTaskQueue']['parameters']) {
		return this.client.GET('/api/v1/namespaces/{namespace}/task-queues/{task_queue.name}', {
			params
		});
	}

	updateNamespace(
		params: operations['UpdateNamespace']['parameters'],
		body: components['schemas']['UpdateNamespaceRequest']
	) {
		return this.client.POST('/api/v1/namespaces/{namespace}/update', { params, body });
	}

	getWorkerTaskReachability(params: operations['GetWorkerTaskReachability']['parameters']) {
		return this.client.GET('/api/v1/namespaces/{namespace}/worker-task-reachability', { params });
	}

	countWorkflowExecutions(params: operations['CountWorkflowExecutions']['parameters']) {
		return this.client.GET('/api/v1/namespaces/{namespace}/workflow-count', { params });
	}

	listWorkflowExecutions(params: operations['ListWorkflowExecutions']['parameters']) {
		return this.client.GET('/api/v1/namespaces/{namespace}/workflows', { params });
	}

	describeWorkflowExecution(params: operations['DescribeWorkflowExecution']['parameters']) {
		return this.client.GET('/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}', {
			params
		});
	}

	getWorkflowExecutionHistory(params: operations['GetWorkflowExecutionHistory']['parameters']) {
		return this.client.GET(
			'/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}/history',
			{ params }
		);
	}

	getWorkflowExecutionHistoryReverse(
		params: operations['GetWorkflowExecutionHistoryReverse']['parameters']
	) {
		return this.client.GET(
			'/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}/history-reverse',
			{ params }
		);
	}

	queryWorkflow(
		params: operations['QueryWorkflow']['parameters'],
		body: components['schemas']['QueryWorkflowRequest']
	) {
		return this.client.POST(
			'/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}/query/{query.query_type}',
			{ params, body }
		);
	}

	startWorkflowExecution(
		params: operations['StartWorkflowExecution']['parameters'],
		body: components['schemas']['StartWorkflowExecutionRequest']
	) {
		return this.client.POST('/api/v1/namespaces/{namespace}/workflows/{workflowId}', {
			params,
			body
		});
	}

	signalWithStartWorkflowExecution(
		params: operations['SignalWithStartWorkflowExecution']['parameters'],
		body: components['schemas']['SignalWithStartWorkflowExecutionRequest']
	) {
		return this.client.POST(
			'/api/v1/namespaces/{namespace}/workflows/{workflowId}/signal-with-start/{signalName}',
			{ params, body }
		);
	}

	requestCancelWorkflowExecution(
		params: operations['RequestCancelWorkflowExecution']['parameters'],
		body: components['schemas']['RequestCancelWorkflowExecutionRequest']
	) {
		return this.client.POST(
			'/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/cancel',
			{ params, body }
		);
	}

	resetWorkflowExecution(
		params: operations['ResetWorkflowExecution']['parameters'],
		body: components['schemas']['ResetWorkflowExecutionRequest']
	) {
		return this.client.POST(
			'/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/reset',
			{ params, body }
		);
	}

	signalWorkflowExecution(
		params: operations['SignalWorkflowExecution']['parameters'],
		body: components['schemas']['SignalWorkflowExecutionRequest']
	) {
		return this.client.POST(
			'/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/signal/{signalName}',
			{ params, body }
		);
	}

	terminateWorkflowExecution(
		params: operations['TerminateWorkflowExecution']['parameters'],
		body: components['schemas']['TerminateWorkflowExecutionRequest']
	) {
		return this.client.POST(
			'/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/terminate',
			{ params, body }
		);
	}

	updateWorkflowExecution(
		params: operations['UpdateWorkflowExecution']['parameters'],
		body: components['schemas']['UpdateWorkflowExecutionRequest']
	) {
		return this.client.POST(
			'/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/update/{request.input.name}',
			{ params, body }
		);
	}

	getSystemInfo() {
		return this.client.GET('/api/v1/system-info');
	}
}
