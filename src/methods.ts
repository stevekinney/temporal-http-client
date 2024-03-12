import { createClient } from './client.js';

import type { operations, components } from './schema.js';

const client = createClient({});

export const getClusterInfo = () => {
	return client.GET('/api/v1/cluster-info', {});
};

export const listNamespaces = (params: operations['ListNamespaces']['parameters']) => {
	return client.GET('/api/v1/namespaces', { params });
};

export const registerNamespace = (body: components['schemas']['RegisterNamespaceRequest']) => {
	return client.POST('/api/v1/namespaces', { body });
};

export const describeNamespace = (params: operations['DescribeNamespace']['parameters']) => {
	return client.GET('/api/v1/namespaces/{namespace}', { params });
};

export const respondActivityTaskCanceled = (
	params: operations['RespondActivityTaskCanceled']['parameters'],
	body: components['schemas']['RespondActivityTaskCanceledRequest']
) => {
	return client.POST('/api/v1/namespaces/{namespace}/activities/cancel', { params, body });
};

export const respondActivityTaskCanceledById = (
	params: operations['RespondActivityTaskCanceledById']['parameters'],
	body: components['schemas']['RespondActivityTaskCanceledByIdRequest']
) => {
	return client.POST('/api/v1/namespaces/{namespace}/activities/cancel-by-id', { params, body });
};

export const respondActivityTaskCompleted = (
	params: operations['RespondActivityTaskCompleted']['parameters'],
	body: components['schemas']['RespondActivityTaskCompletedRequest']
) => {
	return client.POST('/api/v1/namespaces/{namespace}/activities/complete', { params, body });
};

export const respondActivityTaskCompletedById = (
	params: operations['RespondActivityTaskCompletedById']['parameters'],
	body: components['schemas']['RespondActivityTaskCompletedByIdRequest']
) => {
	return client.POST('/api/v1/namespaces/{namespace}/activities/complete-by-id', { params, body });
};

export const respondActivityTaskFailed = (
	params: operations['RespondActivityTaskFailed']['parameters'],
	body: components['schemas']['RespondActivityTaskFailedRequest']
) => {
	return client.POST('/api/v1/namespaces/{namespace}/activities/fail', { params, body });
};

export const respondActivityTaskFailedById = (
	params: operations['RespondActivityTaskFailedById']['parameters'],
	body: components['schemas']['RespondActivityTaskFailedByIdRequest']
) => {
	return client.POST('/api/v1/namespaces/{namespace}/activities/fail-by-id', { params, body });
};

export const recordActivityTaskHeartbeat = (
	params: operations['RecordActivityTaskHeartbeat']['parameters'],
	body: components['schemas']['RecordActivityTaskHeartbeatRequest']
) => {
	return client.POST('/api/v1/namespaces/{namespace}/activities/heartbeat', { params, body });
};

export const recordActivityTaskHeartbeatById = (
	params: operations['RecordActivityTaskHeartbeatById']['parameters'],
	body: components['schemas']['RecordActivityTaskHeartbeatByIdRequest']
) => {
	return client.POST('/api/v1/namespaces/{namespace}/activities/heartbeat-by-id', { params, body });
};

export const listArchivedWorkflowExecutions = (
	params: operations['ListArchivedWorkflowExecutions']['parameters']
) => {
	return client.GET('/api/v1/namespaces/{namespace}/archived-workflows', { params });
};

export const listBatchOperations = (params: operations['ListBatchOperations']['parameters']) => {
	return client.GET('/api/v1/namespaces/{namespace}/batch-operations', { params });
};

export const describeBatchOperation = (
	params: operations['DescribeBatchOperation']['parameters']
) => {
	return client.GET('/api/v1/namespaces/{namespace}/batch-operations/{jobId}', { params });
};

export const startBatchOperation = (
	params: operations['StartBatchOperation']['parameters'],
	body: components['schemas']['StartBatchOperationRequest']
) => {
	return client.POST('/api/v1/namespaces/{namespace}/batch-operations/{jobId}', { params, body });
};

export const stopBatchOperation = (
	params: operations['StopBatchOperation']['parameters'],
	body: components['schemas']['StopBatchOperationRequest']
) => {
	return client.POST('/api/v1/namespaces/{namespace}/batch-operations/{jobId}/stop', {
		params,
		body
	});
};

export const listSchedules = (params: operations['ListSchedules']['parameters']) => {
	return client.GET('/api/v1/namespaces/{namespace}/schedules', { params });
};

export const describeSchedule = (params: operations['DescribeSchedule']['parameters']) => {
	return client.GET('/api/v1/namespaces/{namespace}/schedules/{scheduleId}', { params });
};

export const createSchedule = (
	params: operations['CreateSchedule']['parameters'],
	body: components['schemas']['CreateScheduleRequest']
) => {
	return client.POST('/api/v1/namespaces/{namespace}/schedules/{scheduleId}', { params, body });
};

export const deleteSchedule = (params: operations['DeleteSchedule']['parameters']) => {
	return client.DELETE('/api/v1/namespaces/{namespace}/schedules/{scheduleId}', { params });
};

export const listScheduleMatchingTimes = (
	params: operations['ListScheduleMatchingTimes']['parameters']
) => {
	return client.GET('/api/v1/namespaces/{namespace}/schedules/{scheduleId}/matching-times', {
		params
	});
};

export const patchSchedule = (
	params: operations['PatchSchedule']['parameters'],
	body: components['schemas']['PatchScheduleRequest']
) => {
	return client.POST('/api/v1/namespaces/{namespace}/schedules/{scheduleId}/patch', {
		params,
		body
	});
};

export const updateSchedule = (
	params: operations['UpdateSchedule']['parameters'],
	body: components['schemas']['UpdateScheduleRequest']
) => {
	return client.POST('/api/v1/namespaces/{namespace}/schedules/{scheduleId}/update', {
		params,
		body
	});
};

export const listSearchAttributes = (params: operations['ListSearchAttributes']['parameters']) => {
	return client.GET('/api/v1/namespaces/{namespace}/search-attributes', { params });
};

export const getWorkerBuildIdCompatibility = (
	params: operations['GetWorkerBuildIdCompatibility']['parameters']
) => {
	return client.GET(
		'/api/v1/namespaces/{namespace}/task-queues/{taskQueue}/worker-build-id-compatibility',
		{ params }
	);
};

export const describeTaskQueue = (params: operations['DescribeTaskQueue']['parameters']) => {
	return client.GET('/api/v1/namespaces/{namespace}/task-queues/{task_queue.name}', { params });
};

export const updateNamespace = (
	params: operations['UpdateNamespace']['parameters'],
	body: components['schemas']['UpdateNamespaceRequest']
) => {
	return client.POST('/api/v1/namespaces/{namespace}/update', { params, body });
};

export const getWorkerTaskReachability = (
	params: operations['GetWorkerTaskReachability']['parameters']
) => {
	return client.GET('/api/v1/namespaces/{namespace}/worker-task-reachability', { params });
};

export const countWorkflowExecutions = (
	params: operations['CountWorkflowExecutions']['parameters']
) => {
	return client.GET('/api/v1/namespaces/{namespace}/workflow-count', { params });
};

export const listWorkflowExecutions = (
	params: operations['ListWorkflowExecutions']['parameters']
) => {
	return client.GET('/api/v1/namespaces/{namespace}/workflows', { params });
};

export const describeWorkflowExecution = (
	params: operations['DescribeWorkflowExecution']['parameters']
) => {
	return client.GET('/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}', { params });
};

export const getWorkflowExecutionHistory = (
	params: operations['GetWorkflowExecutionHistory']['parameters']
) => {
	return client.GET('/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}/history', {
		params
	});
};

export const getWorkflowExecutionHistoryReverse = (
	params: operations['GetWorkflowExecutionHistoryReverse']['parameters']
) => {
	return client.GET(
		'/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}/history-reverse',
		{ params }
	);
};

export const queryWorkflow = (
	params: operations['QueryWorkflow']['parameters'],
	body: components['schemas']['QueryWorkflowRequest']
) => {
	return client.POST(
		'/api/v1/namespaces/{namespace}/workflows/{execution.workflow_id}/query/{query.query_type}',
		{ params, body }
	);
};

export const startWorkflowExecution = (
	params: operations['StartWorkflowExecution']['parameters'],
	body: components['schemas']['StartWorkflowExecutionRequest']
) => {
	return client.POST('/api/v1/namespaces/{namespace}/workflows/{workflowId}', { params, body });
};

export const signalWithStartWorkflowExecution = (
	params: operations['SignalWithStartWorkflowExecution']['parameters'],
	body: components['schemas']['SignalWithStartWorkflowExecutionRequest']
) => {
	return client.POST(
		'/api/v1/namespaces/{namespace}/workflows/{workflowId}/signal-with-start/{signalName}',
		{ params, body }
	);
};

export const requestCancelWorkflowExecution = (
	params: operations['RequestCancelWorkflowExecution']['parameters'],
	body: components['schemas']['RequestCancelWorkflowExecutionRequest']
) => {
	return client.POST(
		'/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/cancel',
		{ params, body }
	);
};

export const resetWorkflowExecution = (
	params: operations['ResetWorkflowExecution']['parameters'],
	body: components['schemas']['ResetWorkflowExecutionRequest']
) => {
	return client.POST(
		'/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/reset',
		{ params, body }
	);
};

export const signalWorkflowExecution = (
	params: operations['SignalWorkflowExecution']['parameters'],
	body: components['schemas']['SignalWorkflowExecutionRequest']
) => {
	return client.POST(
		'/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/signal/{signalName}',
		{ params, body }
	);
};

export const terminateWorkflowExecution = (
	params: operations['TerminateWorkflowExecution']['parameters'],
	body: components['schemas']['TerminateWorkflowExecutionRequest']
) => {
	return client.POST(
		'/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/terminate',
		{ params, body }
	);
};

export const updateWorkflowExecution = (
	params: operations['UpdateWorkflowExecution']['parameters'],
	body: components['schemas']['UpdateWorkflowExecutionRequest']
) => {
	return client.POST(
		'/api/v1/namespaces/{namespace}/workflows/{workflow_execution.workflow_id}/update/{request.input.name}',
		{ params, body }
	);
};

export const getSystemInfo = () => {
	return client.GET('/api/v1/system-info', {});
};
