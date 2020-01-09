import * as React from 'react';

import { AvTransform, AvGrabbable, AvSphereHandle, GrabResponse } from '@aardvarkxr/aardvark-react';
import { AvNodeTransform, AvGrabEvent } from '@aardvarkxr/aardvark-shared';
import { NodePose, ExpiringControl } from '../types';
import bind from 'bind-decorator';

interface ConditionalGrabbableProps {
	children: React.ReactNode,
	pose: NodePose,
	modelUri: string,
	control: ExpiringControl,
	localUser: string | null,
	onTransformUpdated: (parentFromNode: AvNodeTransform, universeFromNode: AvNodeTransform) => void
	onGrabRequest: ( event: AvGrabEvent ) => Promise<GrabResponse>;
}

export class ConditionalGrabbable extends React.Component<ConditionalGrabbableProps, {}>
{
	public render() {
		const shouldRenderBasicTransform =
			this.props.localUser != null
			&& this.props.control.owner != null 
			&& this.props.control.owner != this.props.localUser;

		if (shouldRenderBasicTransform) {
			const transformProps = {
				translateX: this.props.pose.position.x,
				translateY: this.props.pose.position.y,
				translateZ: this.props.pose.position.z,
				rotation: this.props.pose.rotation,
				scaleX: this.props.pose.scale.x,
				scaleY: this.props.pose.scale.y,
				scaleZ: this.props.pose.scale.z
			};

			return (
				<AvTransform {...transformProps}>
					{this.props.children}
				</AvTransform>
			);
		}

		return (
			<AvGrabbable
				onTransformUpdated={this.props.onTransformUpdated}
				onGrabRequest={this.props.onGrabRequest}
				preserveDropTransform={true}
				initialTransform={this.props.pose}>
				<AvSphereHandle radius={ 0.3 } />
				{this.props.children}
			</AvGrabbable>
		);
	}
}
